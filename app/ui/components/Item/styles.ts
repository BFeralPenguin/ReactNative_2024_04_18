import {Theme} from '@theme';
import {StyleSheet} from 'react-native';

export const getItemStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      gap: 10,
      padding: 10,
      margin: 10,
      borderCurve: 'circular',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      // TODO Color depending on mode
      backgroundColor: theme.colors.primary,
      shadowColor: theme.colors.shadow,
      // Note: Shadow does not work without bg color
      elevation: 10,
    },

    imgContainer: {
      justifyContent: 'center',
    },
    img: {
      backgroundColor: theme.colors.primary,
      margin: 10,
      width: 70,
      height: 70,
      resizeMode: 'cover',
      borderColor: 'grey',
      borderWidth: 1,
    },
    imgIsNewBubbleContainer: {
      position: 'absolute',
      right: 0,
      top: 0,
      padding: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      backgroundColor: theme.colors.secondary,
      borderRadius: 30 / 2,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    imgIsNewText: {
      ...theme.text.small,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },

    infoContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    titleContainer: {},
    title: {
      ...theme.text.large,
    },

    priceContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    priceNew: {
      ...theme.text.medium,
      fontWeight: 'bold',
    },
    priceOld: {
      ...theme.text.medium,
      textDecorationLine: 'line-through',
    },

    descriptionContainer: {},
    description: {
      ...theme.text.medium,
    },

    actionsContainer: {
      justifyContent: 'space-between',
    },

    addToFavoriteContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    addToFavoriteAction: {
      ...theme.text.large,
    },
    addToFavoriteIsFavorite: {
      color: theme.colors.red,
    },
    addToFavoriteIsNotFavorite: {
      color: theme.colors.secondary,
    },

    buyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    buyText: {
      textTransform: 'capitalize',
    },
    buyAction: {
      ...theme.text.large,
    },
  });

export const getItemListStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection: 'row',
    },
  });

export const getItemFilterStyles = (theme: Theme) =>
  StyleSheet.create({
    mainFilterContainer: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: 10,
      gap: 10,
      borderColor: theme.colors.outline,
      borderWidth: 1,
    },

    searchInput: {
      flex: 1,
      borderColor: theme.colors.outline,
      borderWidth: 1,
    },

    actionsContainer: {
      flexDirection: 'row',
      gap: 10,
    },

    searchAction: {
      ...theme.text.large,
    },

    heartModalContainer: {
      justifyContent: 'flex-end',
    },

    heartModalContent: {
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderWidth: 1,
      borderColor: 'white',
    },

    advancedFilterContainer: {
      paddingHorizontal: 10,
      width: '100%',
    },

    isNewModalContainer: {
      justifyContent: 'flex-start',
    },

    isNewModalContent: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: 10,
      backgroundColor: theme.colors.primary,
    },

    isNewCheckboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    filterTextString: {
      ...theme.text.large,
    },

    filterOnlyNewText: {
      ...theme.text.medium,
    },
  });
