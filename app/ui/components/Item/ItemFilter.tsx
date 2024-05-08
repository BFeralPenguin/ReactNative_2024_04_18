import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';

import {CustomModal} from '@components/CustomModal';
import {CustomPressable} from '@components/CustomPressable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AddToFavorite} from '../AddToFavorite';
import {itemFilterStyles} from './itemStyles';
import CheckBox from '@react-native-community/checkbox';
import theme from '@theme';

// TODO FIXME Питання чи ок НЕ передавати сюди isVisible а просто не рендерити компонент
//  і стейт тримати всередині
export function ItemFilter({
  onFilterText,
  // onFilterFavorite,
  onFilterByIsNew,
}: {
  onFilterText?: (text: string) => void;
  // TODO
  // onFilterFavorite?: (isFavorite: boolean) => void;
  onFilterByIsNew?: (isApply: boolean) => void;
}): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [isAdvancedSearchModalVisible, setIsNewModalVisible] = useState(false);
  const [isFilterByIsNew, setIsFilterByIsNew] = useState(false);

  function showModal(): void {
    setModalVisible(true);
  }

  function closeHeartModal(): void {
    setModalVisible(false);
  }

  function toggleIsInputVisible(): void {
    setIsInputVisible(!isInputVisible);
  }

  function onFilterTextChange(text: string): void {
    setFilterText(text);
    onFilterText && onFilterText(text);
  }

  function showAdvancedSearchModal(): void {
    setIsNewModalVisible(true);
  }

  function closeAdvancedSearchModal(): void {
    setIsNewModalVisible(false);
    onFilterByIsNew?.(isFilterByIsNew);
  }

  return (
    <>
      <View style={itemFilterStyles.mainFilterContainer}>
        {isInputVisible && (
          <TextInput
            style={itemFilterStyles.searchInput}
            value={filterText}
            onChangeText={value => onFilterTextChange(value)}
          />
        )}

        <View style={itemFilterStyles.actionsContainer}>
          <AddToFavorite isFavorite={modalVisible} onChange={showModal} />

          <CustomPressable onPress={toggleIsInputVisible}>
            <Icon name="search" style={itemFilterStyles.searchAction} />
          </CustomPressable>
        </View>

        {modalVisible && (
          <CustomModal
            onClose={closeHeartModal}
            style={itemFilterStyles.heartModalContainer}>
            <View style={itemFilterStyles.heartModalContent}>
              <CustomPressable onPress={closeHeartModal}>
                {/* TODO Move to strings */}
                <Text>Close modal</Text>
              </CustomPressable>
            </View>
          </CustomModal>
        )}

        {isAdvancedSearchModalVisible && (
          <CustomModal
            onClose={closeAdvancedSearchModal}
            style={itemFilterStyles.isNewModalContainer}>
            <View style={itemFilterStyles.isNewModalContent}>
              <Text style={theme.text.large}>Filter</Text>
              <View style={itemFilterStyles.isNewCheckboxContainer}>
                <CheckBox
                  value={isFilterByIsNew}
                  onValueChange={setIsFilterByIsNew}></CheckBox>
                {/* TODO Move to strings */}
                <Text>Only new</Text>
              </View>
            </View>
          </CustomModal>
        )}
      </View>
      <View style={itemFilterStyles.advancedFilterContainer}>
        <CustomPressable onPress={showAdvancedSearchModal}>
          {/* TODO Move to strings */}
          <Text style={theme.text.large}>Filter</Text>
        </CustomPressable>
      </View>
    </>
  );
}
