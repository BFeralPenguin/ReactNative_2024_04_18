import {StyleSheet, TextStyle} from 'react-native';

// TODO move to theme.tsx
const textSmall: TextStyle = {
  fontSize: 10,
};

const textMedium: TextStyle = {
  fontSize: 14,
};

const textLarge: TextStyle = {
  fontSize: 16,
};

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
    borderColor: '#0AA',
    // TODO Color depending on mode
    backgroundColor: '#871',
    shadowColor: '#FFF',
    // Note: Shadow does not work without bg color
    elevation: 10,
  },

  imgContainer: {
    justifyContent: 'center',
  },
  img: {
    backgroundColor: '#BA0',
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
    backgroundColor: 'burlywood',
    borderRadius: 30 / 2,
    borderWidth: 1,
    borderColor: 'grey',
  },
  imgIsNewText: {
    ...textSmall,
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
    ...textLarge,
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
    ...textLarge,
    color: 'red',
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
    ...textLarge,
  },
});
