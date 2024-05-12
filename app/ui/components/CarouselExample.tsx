import assets from '@assets';
import {Carousel} from '@components/Carousel';
import useTheme, {Theme} from '@theme';
import {useMemo} from 'react';
import {Image, StyleSheet, View} from 'react-native';

export function CarouselExample(): React.JSX.Element {
  const {styles} = useTheme(getStyles);

  // const theme = useTheme();
  // const styles = useMemo(() => {
  //   console.log('CarouselExample: Use memo called');
  //   return getStyles(theme);
  // }, [theme]);

  return (
    <>
      <View style={styles.carouselContainer}>
        <Carousel horizontal={true} autoScrollAfterMs={5000}>
          {Array.from({length: 10}).map((_, i) => (
            <View style={styles.itemContainer}>
              <Image
                key={i}
                style={[
                  styles.itemImg,
                  // TODO FIXME Shortcut to make items look different and not search for assets
                  (i & 1 && {width: 50}) || {},
                ]}
                source={assets.pizza}
              />
            </View>
          ))}
        </Carousel>
      </View>
    </>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    carouselContainer: {
      width: 420,
      borderColor: theme.colors.outline,
      borderWidth: 1,
    },

    itemContainer: {
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      width: 400,
      height: 400,
      margin: 10,
    },

    itemImg: {
      width: 400,
      height: 400,
    },
  });
