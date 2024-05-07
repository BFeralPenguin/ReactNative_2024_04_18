import React, {useState} from 'react';
import {Modal, Text, TextInput, View} from 'react-native';

import {CustomPressable} from '@components/CustomPressable';
import {AddToFavorite} from '../AddToFavorite';
import {itemFilterStyles} from './itemStyles';

export function ItemFilter({
  onFilterText,
  onFilterFavorite,
}: {
  onFilterText?: (text: string) => void;
  onFilterFavorite?: (isFavorite: boolean) => void;
}): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);

  function showModal(): void {
    setModalVisible(true);
  }

  function closeModal(): void {
    setModalVisible(false);
  }

  return (
    <>
      <View style={itemFilterStyles.mainContainer}>
        <TextInput />
        <AddToFavorite isFavorite={modalVisible} onChange={showModal} />
        {/* <CustomPressable onPress={() => setModalVisible(true)}> */}
        {/* <Icon name="search" style={theme.text.large} /> */}
        {/* </CustomPressable> */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <CustomPressable
            onPress={event =>
              event.target == event.currentTarget && closeModal()
            }>
            <View style={itemFilterStyles.modalContainer}>
              <View style={itemFilterStyles.modalContent}>
                <CustomPressable onPress={closeModal}>
                  <Text>Close Modal</Text>
                </CustomPressable>
              </View>
            </View>
          </CustomPressable>
        </Modal>
      </View>
    </>
  );
}
