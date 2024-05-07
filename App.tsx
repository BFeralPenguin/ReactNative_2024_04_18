import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ItemList} from './app/ui/components/Item';
import mocks from '@mocks';
import {ItemFilter} from './app/ui/components/Item';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[styles.safeArea, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={[
          styles.helloWorldView,
          {
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          },
        ]}>
        <Text style={styles.helloWorldText}>Hello hillel</Text>
        <ItemFilter />
        <ItemList pizzas={mocks.pizzas} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  helloWorldView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helloWorldText: {
    fontSize: 24,
    fontWeight: '900',
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
