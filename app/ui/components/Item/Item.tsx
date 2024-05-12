import React from 'react';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import assets from '@assets';
import strings from '@strings';
import {useStyles} from '@theme';
import {Pizza} from '@types';
import {AddToFavorite} from '../AddToFavorite';
import {CustomPressable} from '../CustomPressable';
import {getItemStyles} from './styles';

export function Item({
  // TODO Consider using destructuring
  pizza,
  onAddToFavorite,
  onBuy,
}: {
  pizza: Pizza;
  onAddToFavorite?: (value: boolean) => void;
  onBuy?: () => void;
}): React.JSX.Element {
  const {styles} = useStyles(getItemStyles);

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={assets.pizza} />
          {pizza.isNew && (
            <View style={styles.imgIsNewBubbleContainer}>
              <Text style={styles.imgIsNewText}>{strings.new}</Text>
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {pizza.title.toUpperCase()}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceNew}>{pizza.price}</Text>
            {pizza.oldPrice && (
              <Text style={styles.priceOld}>{pizza.oldPrice}</Text>
            )}
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description} numberOfLines={1}>{pizza.description}</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <View style={styles.addToFavoriteContainer}>
            <AddToFavorite
              isFavorite={pizza.isFavorite}
              onChange={
                onAddToFavorite && (() => onAddToFavorite(!pizza.isFavorite))
              }
            />
          </View>
          <CustomPressable onPress={onBuy && (_ => onBuy())}>
            <View style={styles.buyContainer}>
              <Text style={styles.buyText}>{strings.buy}</Text>
              <Icon name="shopping-cart" style={styles.buyAction}></Icon>
            </View>
          </CustomPressable>
        </View>
      </View>
    </>
  );
}
