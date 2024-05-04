import React from 'react';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {assets} from '@assets';
import {strings} from '@strings';
import {itemStyles} from './itemStyles';

export function Item(): React.JSX.Element {
  const title = 'Title';
  const newPrice = 'New price';
  const oldPrice = 'Old price';
  const description = 'Long title long title long title';

  return (
    <>
      <View style={itemStyles.mainContainer}>
        <View style={itemStyles.imgContainer}>
          <Image style={itemStyles.img} source={assets.pizza} />
          <View style={itemStyles.imgIsNewBubbleContainer}>
            <Text style={itemStyles.imgIsNewText}>{strings.new}</Text>
          </View>
        </View>

        <View style={itemStyles.infoContainer}>
          <View style={itemStyles.titleContainer}>
            <Text style={itemStyles.title} numberOfLines={1}>
              {title.toUpperCase()}
            </Text>
          </View>
          <View style={itemStyles.priceContainer}>
            <Text style={itemStyles.priceNew}>{newPrice}</Text>
            <Text style={itemStyles.priceOld}>{oldPrice}</Text>
          </View>
          <View style={itemStyles.descriptionContainer}>
            <Text numberOfLines={1}>{description}</Text>
          </View>
        </View>

        <View style={itemStyles.actionsContainer}>
          <View style={itemStyles.addToFavoriteContainer}>
            <Icon name="heart" style={itemStyles.addToFavoriteAction}></Icon>
          </View>
          <View style={itemStyles.buyContainer}>
            <Text style={itemStyles.buyText}>{strings.buy}</Text>
            <Icon name="shopping-cart" style={itemStyles.buyAction}></Icon>
          </View>
        </View>
      </View>
    </>
  );
}
