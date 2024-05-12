import {useTheme} from '@theme';
import {Switch, SwitchChangeEvent} from 'react-native';

export function CustomSwitch({
  value,
  disabled,
  onChange,
}: {
  value: boolean;
  disabled?: boolean;
  onChange?: (event: SwitchChangeEvent) => void;
}): React.JSX.Element {
  const {theme} = useTheme();

  return (
    <Switch
      trackColor={{
        true: theme.colors.secondary,
        false: theme.colors.onPrimary,
      }}
      thumbColor={theme.colors.outline}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
