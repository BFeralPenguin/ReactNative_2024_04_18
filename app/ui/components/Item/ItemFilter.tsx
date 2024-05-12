import React, {useMemo, useState} from 'react';
import {Text, TextInput, View} from 'react-native';

import {CustomModal} from '@components/CustomModal';
import {CustomPressable} from '@components/CustomPressable';
import CheckBox from '@react-native-community/checkbox';
import strings from '@strings';
import useTheme from '@theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AddToFavorite} from '../AddToFavorite';
import {getItemFilterStyles} from './styles';

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
  const {styles} = useTheme(getItemFilterStyles);

  // const theme = useTheme();
  // const itemFilterStyles = useMemo(() => {
  //   console.log('ItemList: Use memo called');
  //   return getItemFilterStyles(theme);
  // }, [theme]);

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
      <View style={styles.mainFilterContainer}>
        {isInputVisible && (
          <TextInput
            style={styles.searchInput}
            value={filterText}
            onChangeText={value => onFilterTextChange(value)}
          />
        )}

        <View style={styles.actionsContainer}>
          <AddToFavorite isFavorite={modalVisible} onChange={showModal} />

          <CustomPressable onPress={toggleIsInputVisible}>
            <Icon name="search" style={styles.searchAction} />
          </CustomPressable>
        </View>

        {modalVisible && (
          <CustomModal
            onClose={closeHeartModal}
            style={styles.heartModalContainer}>
            <View style={styles.heartModalContent}>
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
            style={styles.isNewModalContainer}>
            <View style={styles.isNewModalContent}>
              <Text style={styles.filterTextString}>{strings.filter}</Text>
              <View style={styles.isNewCheckboxContainer}>
                <CheckBox
                  value={isFilterByIsNew}
                  onValueChange={setIsFilterByIsNew}></CheckBox>
                <Text>{strings.filterOnlyNew}</Text>
              </View>
            </View>
          </CustomModal>
        )}
      </View>
      <View style={styles.advancedFilterContainer}>
        <CustomPressable onPress={showAdvancedSearchModal}>
          <Text style={styles.filterTextString}>{strings.filter}</Text>
        </CustomPressable>
      </View>
    </>
  );
}
