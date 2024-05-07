import theme from '@theme'
import React from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { CustomPressable } from './CustomPressable'

export function AddToFavorite({
  isFavorite,
  onChange,
}: {
  isFavorite: boolean;
  onChange?: () => void;
}): React.JSX.Element {
  return (
    <>
      <CustomPressable onPress={onChange && (_ => onChange())}>
        <Icon
          name="heart"
          style={[
            addToFavoriteStyles.addToFavoriteAction,
            isFavorite
              ? addToFavoriteStyles.addToFavoriteIsFavorite
              : addToFavoriteStyles.addToFavoriteIsNotFavorite,
          ]}/>
      </CustomPressable>
    </>
  );
}

export const addToFavoriteStyles = StyleSheet.create({
  addToFavoriteAction: {
    ...theme.text.large,
  },
  addToFavoriteIsFavorite: {
    color: theme.colors.red,
  },
  addToFavoriteIsNotFavorite: {
    color: theme.colors.secondary,
  },
});
