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

import {CarouselExample} from '@components/CarouselExample';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
        {/* <ItemsListScreen /> */}
        <CarouselExample />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
});

export default App;
