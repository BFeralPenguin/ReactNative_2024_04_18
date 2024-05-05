import theme from '@theme';
import {GestureResponderEvent, Pressable} from 'react-native';

export function CustomPressable({
  onPress,
  children,
}: {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  children: React.JSX.Element | React.JSX.Element[];
}): React.JSX.Element {
  return (
    <>
      <Pressable
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
