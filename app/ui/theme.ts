import {useEffect, useMemo, useState} from 'react';
import {
  ColorSchemeName,
  StyleSheet,
  TextStyle,
  useColorScheme,
} from 'react-native';

const colors: {
  light: Theme['colors'];
  dark: Theme['colors'];
} = {
  light: {
    // TODO black/white
    primary: '#FFF',
    onPrimary: '#000',
    secondary: 'burlywood',
    outline: '#0AA',
    shadow: '#FFF',
    red: 'red',
  },
  dark: {
    // TODO black/white
    primary: '#000',
    onPrimary: '#FFF',
    secondary: 'burlywood',
    outline: '#0AA',
    shadow: '#FFF',
    red: 'red',
  },
};

const text: {
  light: Theme['text'];
  dark: Theme['text'];
} = {
  light: {
    small: {
      fontSize: 10,
      color: colors.light.onPrimary,
    },
    medium: {
      fontSize: 14,
      color: colors.light.onPrimary,
    },
    large: {
      fontSize: 16,
      color: colors.light.onPrimary,
    },
  },
  dark: {
    small: {
      fontSize: 10,
      color: colors.dark.onPrimary,
    },
    medium: {
      fontSize: 14,
      color: colors.dark.onPrimary,
    },
    large: {
      fontSize: 16,
      color: colors.dark.onPrimary,
    },
  },
};

export type Theme = {
  colors: {
    primary: string;
    onPrimary: string;
    secondary: string;
    outline: string;
    shadow: string;
    red: string;
  };
  text: {
    small: TextStyle;
    medium: TextStyle;
    large: TextStyle;
  };
};

const useTheme = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  getStyles: (theme: Theme) => T,
) => {
  const systemColorScheme = useColorScheme();
  const [userColorScheme, setUserColorScheme] =
    useState<ColorSchemeName | null>(null);
  const [theme, setTheme] = useState<Theme>(getTheme);

  function getTheme() {
    const isDark = (userColorScheme || systemColorScheme) === 'dark';
    return {
      colors: isDark ? colors['dark'] : colors['light'],
      text: isDark ? text['dark'] : text['light'],
    };
  }

  useEffect(() => {
    console.log('useTheme useEffect ');
    setTheme(getTheme);
  }, [systemColorScheme, userColorScheme]);

  // const theme = {
  //   colors: systemColorScheme === 'dark' ? colors['dark'] : colors['light'],
  //   text,
  // };

  // return theme;

  return {
    styles: useMemo(() => {
      console.log('Use memo called');
      return getStyles(theme);
    }, [theme]),
    setUserColorScheme,
  };
};

export default useTheme;
