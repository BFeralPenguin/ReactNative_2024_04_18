import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

// const [theme, setTheme] = useState<Theme>(getTheme);

// let useSystemTheme: boolean = true;
// let userColorScheme: ColorSchemeName = 'light';
// let theme: Theme = getTheme({});

// const [useSystemTheme, setUseSystemTheme] = useState(true);
// const [userColorScheme, setUserColorScheme] =
//   useState<ColorSchemeName>('light');

// function getTheme({
//   systemColorScheme = 'light',
// }: {
//   systemColorScheme?: ColorSchemeName;
// }): Theme {
//   const isDark =
//     (useSystemTheme ? systemColorScheme : userColorScheme) === 'dark';
//   console.log({
//     isDark,
//   });
//   return {
//     isDark,
//     colors: isDark ? colors['dark'] : colors['light'],
//     text: isDark ? text['dark'] : text['light'],
//   };
// }

// const useTheme = <
//   T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
// >(
//   getStyles: (theme: Theme) => T,
// ) => {
//   const systemColorScheme = useColorScheme();
//   const [_useSystemTheme, setUseSystemTheme] = useState(useSystemTheme);
//   const [_userColorScheme, setUserColorScheme] = useState(userColorScheme);
//   const [_theme, setTheme] = useState(theme);
//   // let theme: Theme = getTheme({});

//   useEffect(() => {
//     console.log('useTheme useEffect', {
//       systemColorScheme,
//       userColorScheme,
//       useSystemTheme,
//     });
//     setTheme(getTheme({systemColorScheme}));
//     theme = _theme;
//   }, [systemColorScheme, userColorScheme, useSystemTheme]);

//   // const theme = {
//   //   colors: systemColorScheme === 'dark' ? colors['dark'] : colors['light'],
//   //   text,
//   // };

//   // return theme;

//   return {
//     theme: _theme,
//     styles: useMemo(() => {
//       console.log('Use memo called');
//       return getStyles(_theme);
//     }, [_theme]),
//     userColorScheme,
//     setUserColorScheme: (v: ColorSchemeName) => {
//       userColorScheme = v;
//       setUserColorScheme(v);
//     },
//     useSystemTheme,
//     setUseSystemTheme: (v: boolean) => {
//       useSystemTheme = v;
//       setUseSystemTheme(v);
//     },
//   };
// };

// export default useTheme;

type ThemeContextType = {
  theme: Theme;
  useSystemColorScheme: boolean;
  setUseSystemColorScheme: Dispatch<SetStateAction<boolean>>;
  userColorScheme: ColorSchemeName;
  setUserColorScheme: Dispatch<SetStateAction<ColorSchemeName>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider');
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
      console.log('Use memo called');
      return getStyles(theme.theme);
    }, [theme.theme]),
  };
};

export const ThemeProvider = (props: {children: ReactNode}): ReactElement => {
  const systemColorScheme = useColorScheme();
  const [useSystemColorScheme, setUseSystemColorScheme] = useState(true);
  const [userColorScheme, setUserColorScheme] =
    useState<ColorSchemeName>('light');
  const [theme, setTheme] = useState(getTheme({systemColorScheme}));

  function getTheme({
    systemColorScheme = 'light',
  }: {
    systemColorScheme?: ColorSchemeName;
  }): Theme {
    const isDark =
      (useSystemColorScheme ? systemColorScheme : userColorScheme) === 'dark';
    console.log({
      isDark,
    });
    return {
      isDark,
      colors: isDark ? colors['dark'] : colors['light'],
      text: isDark ? text['dark'] : text['light'],
    };
  }

  useEffect(() => {
    console.log('ThemeProvider useEffect', {
      systemColorScheme,
      useSystemColorScheme,
      userColorScheme,
    });
    setTheme(getTheme({systemColorScheme}));
  }, [systemColorScheme, userColorScheme, useSystemColorScheme]);

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
};
