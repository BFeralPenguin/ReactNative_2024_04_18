import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ItemsListScreen from '@screens/ItemsListScreen';
import {Theme, ThemeProvider, useStyles} from '@theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <_App />
    </ThemeProvider>
  );
}

function _App(): React.JSX.Element {
  const {theme, styles} = useStyles(getStyles);

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
