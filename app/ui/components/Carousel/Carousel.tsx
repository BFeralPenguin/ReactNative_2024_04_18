import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';

import {CustomPressable} from '@components/CustomPressable';
import {getCarouselStyles} from './styles';
import {useStyles} from '@theme';

/**
 * All items in [children] must have the same size.
 */
export function Carousel({
  horizontal = true,
  startAt = 0,
  onChange,
  scrollTriggerPercentage = 0.3,
  children,
  autoScrollAfterMs,
}: {
  horizontal?: boolean;
  startAt?: number;
  onChange?: (newIndex: number) => void;
  scrollTriggerPercentage?: number;
  children: React.JSX.Element[];
  autoScrollAfterMs?: number;
}): React.JSX.Element {
  const {styles} = useStyles(getCarouselStyles);

  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(startAt);
  const [itemSize, setItemSize] = useState(0);
  const [isDragStarted, setIsDragStarted] = useState(false);
  const [nextScrollTimeout, setNextScrollTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);

  useEffect(() => {
    setCurrentIndex(startAt);
  }, [startAt]);

  // AutoScroll countdown restarts when [currentIndex] changes
  useEffect(() => {
    if (!autoScrollAfterMs || autoScrollAfterMs < 0) return;

    clearTimeout(nextScrollTimeout);

    if (isDragStarted) return;

    const timeout = setTimeout(() => {
      scrollToIndexAndSetCurrentIndex(
        currentIndex < children.length - 1 ? currentIndex + 1 : 0,
      );
    }, autoScrollAfterMs);

    setNextScrollTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [autoScrollAfterMs, children.length, currentIndex, isDragStarted]);

  const setItemSizeFromContentSize = useCallback(
    (width: number, height: number) => {
      setItemSize((horizontal ? width : height) / children.length);
    },
    [horizontal, children.length],
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      scrollViewRef.current?.scrollTo({
        [horizontal ? 'x' : 'y']: index * itemSize,
        animated: true,
      });
    },
    [scrollViewRef, horizontal, itemSize],
  );

  const scrollToIndexAndSetCurrentIndex = useCallback(
    (index: number) => {
      scrollToIndex(index);
      setCurrentIndex(index);
      onChange?.(index);
    },
    [scrollToIndex],
  );

  const onScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setIsDragStarted(false);
      const newIndex = calculateIndexFromScrollEndEvent(event, {
        horizontal,
        itemsSize: itemSize,
        currentIndex,
        scrollToNextTriggerPercentage: scrollTriggerPercentage,
      });

      // TODO Cleanup
      // console.log('scrollToIndex', newIndex);
      if (newIndex == currentIndex) return scrollToIndex(newIndex);

      scrollToIndexAndSetCurrentIndex(newIndex);
    },
    [
      // TODO FIXME Чи правильно тут і у всіх use.. передавати всі ці залежності?
      horizontal,
      itemSize,
      currentIndex,
      scrollTriggerPercentage,
      scrollToIndex,
      // Наприклад scrollToIndexAndSetCurrentIndex вже залежить від scrollToIndex
      scrollToIndexAndSetCurrentIndex,
    ],
  );

  // Хотів змінити анімацію і побачив ось таку штуку:
  // https://reactnative.dev/docs/animations#scrollview-with-animated-event-example
  //
  // Там без жодного onScroll... колбека тільки за допомогою анімації зроблено щось подібне
  // Тож питання як правильно?
  // P.S. копіпаст того коду в мене дав видиме зміщення на багатьох айтемах
  // P.S.S. в мене теж було зміщення коли я намагався через onLayout children-ів
  // вирахувати їхній розмір взявши перший - виявилося що він різний і треба рахувати загальний
  // і ділити на к-сть айтемів
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          onScrollBeginDrag={() => setIsDragStarted(true)}
          onScrollEndDrag={onScrollEnd}
          contentContainerStyle={styles.scrollView}
          onContentSizeChange={setItemSizeFromContentSize}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={false}
          horizontal={horizontal}>
          {children}
        </ScrollView>
        {/* TODO FIXME Limit dots row size */}
        <View style={styles.indexIndicatorContainer}>
          {children.map((_, i) => (
            <CustomPressable
              key={i}
              onPress={() => scrollToIndexAndSetCurrentIndex(i)}>
              <View
                style={[
                  styles.indexIndicatorDot,
                  i === currentIndex && styles.indexIndicatorDotCurrent,
                ]}
              />
            </CustomPressable>
          ))}
        </View>
      </View>
    </>
  );
}

/**
 * Returns [currentIndex] if scrolled percentage is less than
 * [scrollToNextTriggerPercentage] (in either direction).
 *
 * Returns whole index to scroll to otherwise.
 */
function calculateIndexFromScrollEndEvent(
  event: NativeSyntheticEvent<NativeScrollEvent>,
  {
    horizontal,
    itemsSize,
    currentIndex,
    scrollToNextTriggerPercentage: scrollTriggerPercentage,
  }: {
    horizontal: boolean;
    itemsSize: number;
    currentIndex: number;
    scrollToNextTriggerPercentage: number;
  },
): number {
  const offset = horizontal
    ? event.nativeEvent.contentOffset.x
    : event.nativeEvent.contentOffset.y;

  const totalItemsScrolled = offset / itemsSize;

  const itemsToScroll = totalItemsScrolled - currentIndex;

  // TODO Cleanup
  // console.log('offset', offset);
  // console.log('itemSize', itemsSize);
  // console.log('currentIndex', currentIndex);
  // console.log('totalItemsScrolled', totalItemsScrolled);
  // console.log('itemsToScroll', itemsToScroll);
  // console.log(
  //   'Math.abs(itemsToScroll) <= scrollToNextTriggerPercentage',
  //   Math.abs(itemsToScroll) <= scrollTriggerPercentage,
  // );

  if (Math.abs(itemsToScroll) <= scrollTriggerPercentage) {
    return currentIndex;
  }

  const newIndex =
    // Need to add or subtract [scrollTriggerPercentage] in order to correctly
    // determine if we need to remain on whole part of [totalItemsScrolled] or
    // scroll one additional item.
    //
    // Example 1:
    // itemsToScroll = 2.3
    // totalItemsScrolled = 10.3
    // scrollTriggerPercentage = 0.4
    // We need to remain on item 10, because we did not reach [scrollTriggerPercentage]
    //
    // Example 2:
    // itemsToScroll = 2.5
    // totalItemsScrolled = 10.5
    // scrollTriggerPercentage = 0.4
    // We need to scroll to 11, because we reached [scrollTriggerPercentage]
    Math.sign(itemsToScroll) == 1
      ? Math.ceil(totalItemsScrolled - scrollTriggerPercentage)
      : Math.floor(totalItemsScrolled + scrollTriggerPercentage);
  return newIndex;
}
