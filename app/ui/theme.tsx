import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Appearance,
  ColorSchemeName,
  StyleSheet,
  TextStyle,
  useColorScheme,
} from 'react-native';

export type Theme = {
  isDark: boolean;
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

type ThemeContextType = {
  theme: Theme;
  useSystemColorScheme: boolean;
  setUseSystemColorScheme: (value: boolean) => void;
  userColorScheme: ColorSchemeName;
  setUserColorScheme: (value: ColorSchemeName) => void;
};

const colors: {
  light: Theme['colors'];
  dark: Theme['colors'];
} = {
  // TODO Use theme from here
  // https://material-foundation.github.io/material-theme-builder/
  // source #A59000
  light: {
    // primary: '#6c5e10',
    // onPrimary: '#383000',
    // primaryContainer: '#524700',
    // onPrimaryContainer: '#f6e388',
    // secondary: '#d0c7a2',
    // onSecondary: '#363016',
    // secondaryContainer: ,
    primary: '#FFF',
    onPrimary: '#000',
    secondary: 'burlywood',
    outline: '#0AA',
    shadow: '#FFF',
    red: 'red',
  },
  dark: {
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

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = (props: {children: ReactNode}): ReactElement => {
  const currentColorScheme = useColorScheme();

  const [userColorScheme, setUserColorScheme] =
    useState<ColorSchemeName>('light');

  const [useSystemColorScheme, setUseSystemColorScheme] = useState(true);

  const [theme, setTheme] = useState(() => getTheme());

  // Recalculate current color scheme
  useEffect(() => {
    Appearance.setColorScheme(useSystemColorScheme ? null : userColorScheme);
  }, [userColorScheme, useSystemColorScheme]);

  // Recalculate theme when current scheme changes
  useEffect(() => {
    // TODO CLeanup
    console.log('ThemeProvider currentColorScheme changed', {
      useSystemColorScheme,
      userColorScheme,
      currentColorScheme,
    });
    setTheme(getTheme());
  }, [currentColorScheme]);

  return (
    <ThemeContext.Provider
      {...props}
      value={{
        theme,
        useSystemColorScheme,
        setUseSystemColorScheme,
        userColorScheme,
        setUserColorScheme,
      }}
    />
  );

  function getTheme(): Theme {
    const isDark = Appearance.getColorScheme() === 'dark';
    return {
      isDark,
      colors: isDark ? colors['dark'] : colors['light'],
      text: isDark ? text['dark'] : text['light'],
    };
  }
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useStyles = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  getStyles: (theme: Theme) => T,
): ThemeContextType & {styles: T} => {
  const theme = useTheme();

  return {
    ...theme,
    styles: useMemo(() => {
      // TODO Cleanup
      // console.log('Use memo called');
      return getStyles(theme.theme);
    }, [theme.theme]),
  };
};
