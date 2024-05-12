import {Theme} from '@theme';
import {StyleSheet} from 'react-native';

export const getSettingStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
    settingContainer: {
      flexDirection: 'row',
    },
    switch: {},
    settingLabel: {
      ...theme.text.medium,
    },
    useDarkModeSwitch: {},
  });
