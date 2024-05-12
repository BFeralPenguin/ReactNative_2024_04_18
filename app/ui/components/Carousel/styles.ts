import {Theme} from '@theme';
import {StyleSheet} from 'react-native';

export const getCarouselStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    scrollView: {
      alignItems: 'center',
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
