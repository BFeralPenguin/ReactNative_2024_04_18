import React, {useState} from 'react';
import {Modal, Text, TextInput, View} from 'react-native';

import {CustomPressable} from '@components/CustomPressable';
import {AddToFavorite} from '../AddToFavorite';
import {itemFilterStyles} from './itemStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '@theme';

export function ItemFilter({
  onFilterText,
  onFilterFavorite,
}: {
  onFilterText?: (text: string) => void;
  onFilterFavorite?: (isFavorite: boolean) => void;
}): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [filterText, setFilterText] = useState('');

  function showModal(): void {
    setModalVisible(true);
  }

  function closeModal(): void {
    setModalVisible(false);
  }

  function toggleIsInputVisible(): void {
    setIsInputVisible(!isInputVisible);
  }

  function onFilterTextChange(text: string): void {
    setFilterText(text);
    onFilterText && onFilterText(text);
  }

  return (
    <>
      <View style={itemFilterStyles.mainContainer}>
        {isInputVisible && (
          <TextInput
            style={itemFilterStyles.input}
            value={filterText}
            onChangeText={value => onFilterTextChange(value)}
          />
        )}

        <View style={itemFilterStyles.actionsContainer}>
          <AddToFavorite isFavorite={modalVisible} onChange={showModal} />

          <CustomPressable onPress={toggleIsInputVisible}>
            <Icon name="search" style={itemFilterStyles.search} />
          </CustomPressable>
        </View>

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
