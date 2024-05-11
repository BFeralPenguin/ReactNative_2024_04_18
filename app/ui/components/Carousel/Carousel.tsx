import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {carouselStyles} from './styles';

export function Carousel({
  horizontal = true,
  startAt = 0,
  onChange,
  scrollToNextTriggerPercentage = 0.3,
}: {
  horizontal?: boolean;
  startAt?: number;
  onChange?: (newIndex: number) => void;
  scrollToNextTriggerPercentage?: number;
}): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(() => startAt);
  useEffect(() => {
    setCurrentIndex(startAt);
  }, [startAt]);

  const scrollViewRef = useRef<ScrollView>(null);

  const itemSize = 200;

  const onScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = horizontal
        ? event.nativeEvent.contentOffset.x
        : event.nativeEvent.contentOffset.y;

      console.log('offset', offset);
      console.log('itemSize', itemSize);
      console.log('currentIndex', currentIndex);
      const totalItemsScrolled = offset / itemSize;
      console.log('totalItemsScrolled', totalItemsScrolled);

      const itemsToScroll = totalItemsScrolled - currentIndex;
      console.log('itemsToScroll', itemsToScroll);

      if (Math.abs(itemsToScroll) > scrollToNextTriggerPercentage) {
        const newIndex =
          Math.sign(itemsToScroll) == 1
            ? Math.ceil(totalItemsScrolled)
            : Math.floor(totalItemsScrolled);
        console.log('newIndex', newIndex);

        scrollViewRef.current?.scrollTo(
          horizontal
            ? {
                x: newIndex * itemSize,
              }
            : {
                y: newIndex * itemSize,
              },
        );
        setCurrentIndex(newIndex);
        onChange?.(newIndex);
      } else {
        console.log('Scroll to current', currentIndex);
        scrollViewRef.current?.scrollTo(
          horizontal
            ? {
                x: currentIndex * itemSize,
              }
            : {
                y: currentIndex * itemSize,
              },
        );
      }
    },
    [currentIndex],
  );

  return (
    <>
      <View style={carouselStyles.container}>
        <ScrollView
          ref={scrollViewRef}
          onScrollEndDrag={onScrollEnd}
          contentContainerStyle={carouselStyles.scrollView}
          horizontal={horizontal}>
          {/* <View style={{flex: 1}}> */}
          <CarouselItem value="0" />
          <CarouselItem value="1" />
          <CarouselItem value="2" />
          <CarouselItem value="3" />
          {/* </View> */}
        </ScrollView>
        <Text>Test</Text>
      </View>
    </>
  );
}

export function CarouselItem({value}: {value: string}) {
  return (
    <>
      <View style={carouselStyles.itemContainer}>
        <Text>{value}</Text>
      </View>
    </>
  );
}
