import React, {useCallback, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import mocks from '@mocks';
import {Pizza} from '@types';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ItemFilter, ItemList} from './app/ui/components/Item';

function App(): React.JSX.Element {
  const [filterText, setFilterText] = useState('');
  const [filterByIsNew, setFilterByIsNew] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // TODO Combine list/filter into separate component
  const getFilterPredicate = useCallback<(pizza: Pizza) => boolean>(
    pizza => {
      let isOk = true;

      if (filterText != '') {
        isOk &&=
          pizza.title.toLowerCase().includes(filterText) ||
          pizza.description?.toLowerCase().includes(filterText) ||
          false;
      }

      if (filterByIsNew) isOk &&= pizza.isNew;

      return isOk;
    },
    [filterText, filterByIsNew],
  );

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
        <ItemFilter
          onFilterText={text => setFilterText(text.toLowerCase())}
          onFilterByIsNew={setFilterByIsNew}
        />
        <ItemList pizzas={mocks.pizzas.filter(getFilterPredicate)} />
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
