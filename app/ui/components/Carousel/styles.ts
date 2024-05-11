import theme from '@theme';
import {StyleSheet} from 'react-native';

export const carouselStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollView: {
    alignItems: 'center',
  },

  exampleItemContainer: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    height: 400,
    margin: 10,
  },

  exampleItemImg: {
    width: 400,
    height: 400,
  },

  indexIndicatorContainer: {
    flexDirection: 'row',
    margin: 10,
  },

  indexIndicatorDot: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.outline,
    marginHorizontal: 5,
  },

  indexIndicatorDotCurrent: {
    backgroundColor: theme.colors.primary,
  },
});
