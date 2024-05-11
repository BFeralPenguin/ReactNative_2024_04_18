import React from 'react';
import {FlatList, View} from 'react-native';

import {Pizza} from '@types';
import {Item} from './Item';
import {itemListStyles} from './styles';

export function ItemList({
  pizzas,
  onAddToFavorite,
  onBuy,
}: {
  pizzas: Pizza[];
  onAddToFavorite?: (pizza: Pizza, isFavorite: boolean) => void;
  onBuy?: (pizza: Pizza) => void;
}): React.JSX.Element {
  return (
    <>
      <View style={itemListStyles.mainContainer}>
        <FlatList
          data={pizzas}
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
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
}
