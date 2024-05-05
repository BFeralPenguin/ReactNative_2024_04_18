import React from 'react';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import assets from '@assets';
import strings from '@strings';
import {Pizza} from '@types';
import {itemStyles} from './itemStyles';
import {CustomPressable} from '../CustomPressable';

export function Item({
  pizza,
  onAddToFavorite: onFavorite,
  onBuy,
}: {
  pizza: Pizza;
  onAddToFavorite: (value: boolean) => void;
  onBuy: () => void;
}): React.JSX.Element {
  return (
    <>
      <View style={itemStyles.mainContainer}>
        <View style={itemStyles.imgContainer}>
          <Image style={itemStyles.img} source={assets.pizza} />
          {pizza.isNew && (
            <View style={itemStyles.imgIsNewBubbleContainer}>
              <Text style={itemStyles.imgIsNewText}>{strings.new}</Text>
            </View>
          )}
        </View>

        <View style={itemStyles.infoContainer}>
          <View style={itemStyles.titleContainer}>
            <Text style={itemStyles.title} numberOfLines={1}>
              {pizza.title.toUpperCase()}
            </Text>
          </View>
          <View style={itemStyles.priceContainer}>
            <Text style={itemStyles.priceNew}>{pizza.price}</Text>
            {pizza.oldPrice && (
              <Text style={itemStyles.priceOld}>{pizza.oldPrice}</Text>
            )}
          </View>
          <View style={itemStyles.descriptionContainer}>
            <Text numberOfLines={1}>{pizza.description}</Text>
          </View>
        </View>

        <View style={itemStyles.actionsContainer}>
          <View style={itemStyles.addToFavoriteContainer}>
            <CustomPressable>
              <Icon
                name="heart"
                style={[
                  itemStyles.addToFavoriteAction,
                  pizza.isFavorite
                    ? itemStyles.addToFavoriteIsFavorite
                    : itemStyles.addToFavoriteIsNotFavorite,
                ]}></Icon>
            </CustomPressable>
          </View>
          <CustomPressable>
            <View style={itemStyles.buyContainer}>
              <Text style={itemStyles.buyText}>{strings.buy}</Text>
              <Icon name="shopping-cart" style={itemStyles.buyAction}></Icon>
            </View>
          </CustomPressable>
        </View>
      </View>
    </>
  );
}
