import React, {useCallback, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';

import mocks from '@mocks';
import {Pizza} from '@types';
import {Item} from './Item';
import {itemListStyles} from './styles';

const PAGE_SIZE = 5;

const pizzaSources = [
  mocks.pizzas.slice(0, mocks.pizzas.length / 2),
  mocks.pizzas.slice(mocks.pizzas.length / 2),
];

export function ItemList({
  pizzas,
  onAddToFavorite,
  onBuy,
}: {
  pizzas: Pizza[];
  onAddToFavorite?: (pizza: Pizza, isFavorite: boolean) => void;
  onBuy?: (pizza: Pizza) => void;
}): React.JSX.Element {
  const [pizzasSourceIndex, setPizzasSourceIndex] = useState(0);
  const [data, setData] = useState(() =>
    pizzaSources[pizzasSourceIndex].slice(0, PAGE_SIZE),
  );
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Cycles between [pizzaSources] in a loop
  const refreshItems = useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => {
      const newIndex =
        pizzasSourceIndex !== pizzaSources.length - 1
          ? pizzasSourceIndex + 1
          : 0;
      setData(pizzaSources[newIndex].slice(0, PAGE_SIZE));
      setPizzasSourceIndex(newIndex);
      setPage(0);
      setIsRefreshing(false);
    }, 3000);
  }, [pizzasSourceIndex]);

  const loadNextItems = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      const start = (page + 1) * PAGE_SIZE;
      setData(data.concat(pizzas.slice(start, start + PAGE_SIZE)));
      setPage(page + 1);
      setIsRefreshing(false);
    }, 3000);
  }, [page, isRefreshing]);

  return (
    <>
      <View style={itemListStyles.mainContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={data => (
            <Item
              pizza={data.item}
              onAddToFavorite={
                onAddToFavorite &&
                (isFavorite => onAddToFavorite(data.item, isFavorite))
              }
              onBuy={onBuy && (() => onBuy(data.item))}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshItems}
            />
          }
          onEndReachedThreshold={1}
          onEndReached={_ => loadNextItems()}
        />
      </View>
    </>
  );
}
