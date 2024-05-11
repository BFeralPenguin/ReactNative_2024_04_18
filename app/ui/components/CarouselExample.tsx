import assets from '@assets';
import {Carousel} from '@components/Carousel';
import theme from '@theme';
import {Image, StyleSheet, View} from 'react-native';

export function CarouselExample(): React.JSX.Element {
  return (
    <>
      <View style={styles.carouselContainer}>
        <Carousel horizontal={true}>
          {Array.from({length: 10}).map((_, i) => (
            <View style={styles.itemContainer}>
              <Image
                key={i}
                style={[
                  styles.itemImg,
                  // Shortcut to make items look different and to not search for assets
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

const styles = StyleSheet.create({
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
