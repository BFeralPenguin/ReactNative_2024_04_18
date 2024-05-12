import {Theme, useStyles} from '@theme';
import React from 'react';
import {Modal, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {CustomPressable} from './CustomPressable';

export function CustomModal({
  style,
  onClose,
  children,
}: {
  style?: StyleProp<ViewStyle>;
  onClose: () => void;
  children: React.JSX.Element | React.JSX.Element[];
}): React.JSX.Element {
  const {styles} = useStyles(getStyles);

  // const theme = useTheme();
  // const styles = useMemo(() => {
  //   console.log('CustomModal: Use memo called');
  //   return getStyles(theme);
  // }, [theme]);

  function closeModal(): void {
    onClose();
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={closeModal}>
        <CustomPressable
          onPress={event =>
            event.target == event.currentTarget && closeModal()
          }>
          <View style={StyleSheet.compose(styles.modalContainer, style)}>
            {children}
          </View>
        </CustomPressable>
      </Modal>
    </>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    modalContainer: {
      height: '100%',
      justifyContent: 'center',
    },
  });
