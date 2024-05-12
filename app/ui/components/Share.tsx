import {Theme, useStyles} from '@theme';
import React from 'react';
import {Share as ReactShare, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CustomPressable} from './CustomPressable';

export function Share({message}: {message: string}) {
  const {styles} = useStyles(getStyles);

  const onShare = async () => {
    try {
      const result = await ReactShare.share({
        message,
      });
      console.log(result);
    } catch (error: any) {
      console.warn('Failed to share', error);
    }
  };

  return (
    <>
      <CustomPressable onPress={onShare}>
        <Icon name="share" style={[styles.share]} />
      </CustomPressable>
    </>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    share: {
      ...theme.text.large,
    },
  });
