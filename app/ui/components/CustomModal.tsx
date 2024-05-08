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

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    justifyContent: 'center',
  },
});
