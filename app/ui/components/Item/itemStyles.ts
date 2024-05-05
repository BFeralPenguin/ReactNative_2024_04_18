import theme from '@theme';
import {StyleSheet} from 'react-native';

export const itemStyles = StyleSheet.create({
  mainContainer: {
    maxWidth: 350,
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
    fontWeight: 'bold',
  },
  priceOld: {
    textDecorationLine: 'line-through',
  },

  descriptionContainer: {},

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

export const itemListStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
  },
});
