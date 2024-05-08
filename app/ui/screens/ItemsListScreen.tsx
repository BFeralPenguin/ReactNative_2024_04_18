import React, {useCallback, useState} from 'react';

import {ItemFilter, ItemList} from '@components/Item';
import mocks from '@mocks';
import {Pizza} from '@types';

function ItemsListScreen(): React.JSX.Element {
  const [filterText, setFilterText] = useState('');
  const [filterByIsNew, setFilterByIsNew] = useState(false);

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
    <>
      <ItemFilter
        onFilterText={text => setFilterText(text.toLowerCase())}
        onFilterByIsNew={setFilterByIsNew}
      />
      <ItemList pizzas={mocks.pizzas.filter(getFilterPredicate)} />
    </>
  );
}

export default ItemsListScreen;
