import LibCheckBox from '@react-native-community/checkbox';
import {useTheme} from '@theme';

export function CustomCheckBox({
  value,
  onChanged,
}: {
  value: boolean;
  onChanged?: (value: boolean) => void;
}): React.JSX.Element {
  const {theme} = useTheme();

  return (
    <LibCheckBox
      value={value}
      onValueChange={onChanged}
      tintColors={{
        true: theme.colors.onPrimary,
        false: theme.colors.onPrimary,
      }}
    />
  );
}
