import theme, {Theme} from '@theme';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CustomPressable} from './CustomPressable';
import useTheme from '@theme';

export function AddToFavorite({
  isFavorite,
  onChange,
}: {
  isFavorite: boolean;
  onChange?: () => void;
}): React.JSX.Element {
  const {styles} = useTheme(getStyles);
  // const theme = useTheme(getStyles);

  // const styles = useMemo(() => {
  //   console.log('AddToFavorite: Use memo called');
  //   return getStyles(theme);
  // }, [theme]);

  return (
    <>
      <CustomPressable onPress={onChange && (_ => onChange())}>
        <Icon
          name="heart"
          style={[
            styles.addToFavoriteAction,
            isFavorite
              ? styles.addToFavoriteIsFavorite
              : styles.addToFavoriteIsNotFavorite,
          ]}
        />
      </CustomPressable>
    </>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
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
