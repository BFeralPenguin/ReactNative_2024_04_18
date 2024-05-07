import theme from '@theme';
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
  style?: StyleProp<ViewStyle> | undefined;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  children: React.JSX.Element | React.JSX.Element[];
}): React.JSX.Element {
  return (
    <>
      <Pressable
        style={style}
        onPress={onPress}
        android_ripple={{
          color: theme.colors.secondary,
          borderless: true,
          radius: 10,
          foreground: true,
        }}>
        {children}
      </Pressable>
    </>
  );
}
