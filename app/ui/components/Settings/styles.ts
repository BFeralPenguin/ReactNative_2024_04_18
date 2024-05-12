import {Theme} from '@theme';
import {StyleSheet} from 'react-native';

export const getSettingStyles = (theme: Theme) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    container: {
      padding: 10,
      margin: 10,
      backgroundColor: theme.colors.primary,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    settingContainer: {
      flexDirection: 'row',
    },
    switch: {},
    settingLabel: {
      ...theme.text.medium,
    },
    useDarkModeSwitch: {},

    gear: {
      ...theme.text.large,
    },
  });
