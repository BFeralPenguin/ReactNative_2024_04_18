import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import mocks from '@mocks';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Item} from './app/ui/components/Item';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
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
        <Item pizza={mocks.pizzas[0]}></Item>
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
});

export default App;
