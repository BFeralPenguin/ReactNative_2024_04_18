import {Theme} from '@theme';
import {StyleSheet} from 'react-native';

export const getSettingStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
    settingContainer: {
      flexDirection: 'row',
    },
    useSystemColorSchemeSwitch: {},
    useDarkModeSwitch: {},
  });
