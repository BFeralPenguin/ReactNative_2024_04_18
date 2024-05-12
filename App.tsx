import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ItemsListScreen from '@screens/ItemsListScreen';
import {Theme, ThemeProvider, useStyles, useTheme} from '@theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <_App />
    </ThemeProvider>
  );
}

function _App(): React.JSX.Element {
  const {
    theme: {isDark},
  } = useTheme();
  const {theme, styles} = useStyles(getStyles);

  console.warn(isDark);
  console.warn(theme.isDark);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={styles.safeArea.backgroundColor}
      />
      <View
        style={[
          styles.helloWorldView,
          {
            backgroundColor: theme.isDark ? Colors.black : Colors.white,
          },
        ]}>
        <Text style={styles.helloWorldText}>Hello hillel</Text>
        {/* <TestThemeComponent /> */}
        <ItemsListScreen />
        {/* <CarouselExample /> */}
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    helloWorldView: {
      height: '100%',
      alignItems: 'center',
    },
    helloWorldText: {
      fontSize: 24,
      fontWeight: '900',
    },
    safeArea: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: theme.isDark ? Colors.darker : Colors.lighter,
    },
  });

export default App;

function TestThemeComponent() {
  const {styles} = useStyles(getTestStyles);
  // const theme = useTheme();
  // const styles = useMemo(() => {
  //   console.log('asdnasdkn');
  //   return getTestStyles(theme);
  // }, [theme]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Set count');
      setCount(prev => (prev += 1));
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <View style={styles.container}>
      <Text>{count}</Text>
    </View>
  );
}

const getTestStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      color: theme.colors.primary,
    },
  });
