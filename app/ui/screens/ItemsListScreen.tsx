import React, {useCallback, useState} from 'react';

import {CustomPressable} from '@components/CustomPressable';
import {ItemFilter, ItemList} from '@components/Item';
import mocks from '@mocks';
import {useTheme} from '@theme';
import {Pizza} from '@types';
import {Linking, Text, View} from 'react-native';

function ItemsListScreen(): React.JSX.Element {
  const [filterText, setFilterText] = useState('');
  const [filterByIsNew, setFilterByIsNew] = useState(false);

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
    <>
      <Header />
      <ItemFilter
        onFilterText={text => setFilterText(text.toLowerCase())}
        onFilterByIsNew={setFilterByIsNew}
      />
      <ItemList pizzas={mocks.pizzas.filter(getFilterPredicate)} />
    </>
  );
}

export default ItemsListScreen;

function Header() {
  const {theme} = useTheme();

  const mail = 'test@gmail.com';
  const tel = '+380630101818';
  const web = 'https://google.com';

  return (
    <>
      <Text style={theme.text.large}>Contact us</Text>
      <View style={{flexDirection: 'row', gap: 10, padding: 10, margin: 10}}>
        <CustomPressable onPress={() => Linking.openURL(`mailto:${mail}`)}>
          <Text style={theme.text.small}>{mail}</Text>
        </CustomPressable>

        <CustomPressable onPress={() => Linking.openURL(`tel:${tel}`)}>
          <Text style={theme.text.small}>{tel}</Text>
        </CustomPressable>

        <CustomPressable onPress={() => Linking.openURL(web)}>
          <Text style={theme.text.small}>{web}</Text>
        </CustomPressable>
      </View>
    </>
  );
}
