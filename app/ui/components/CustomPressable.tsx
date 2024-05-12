import {Theme, useStyles} from '@theme';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';

export function CustomPressable({
  style,
  onPress,
  children,
}: {
  style?: StyleProp<ViewStyle>;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  children: React.JSX.Element | React.JSX.Element[];
}): React.JSX.Element {
  const {styles} = useStyles(getStyles);

  // const theme = useTheme();
  // const styles = useMemo(() => {
  //   console.log('CustomPressable: Use memo called');
  //   return getStyles(theme);
  // }, [theme]);

  return (
    <>
      <Pressable
        style={style}
        onPress={onPress}
        android_ripple={styles.androidRipple}>
        {children}
      </Pressable>
    </>
  );
}

const getStyles = (theme: Theme) => ({
  androidRipple: {
    color: theme.colors.secondary,
    borderless: true,
    radius: 10,
    foreground: true,
  },
});
