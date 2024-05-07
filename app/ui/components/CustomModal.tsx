import React, {useState} from 'react';
import {
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {CustomPressable} from './CustomPressable';

export function CustomModal({
  style,
  onClose,
  children,
}: {
  style?: StyleProp<ViewStyle> | undefined;
  onClose: () => void;
  children: React.JSX.Element | React.JSX.Element[];
}): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(true);

  function closeModal(): void {
    setIsVisible(false);
    onClose();
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
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
