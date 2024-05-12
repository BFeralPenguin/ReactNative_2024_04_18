import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {CustomSwitch} from '@components/CustomSwitch';
import strings from '@strings';
import {useStyles} from '@theme';
import {getSettingStyles} from './styles';
import {CustomModal} from '@components/CustomModal';
import {CustomPressable} from '@components/CustomPressable';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Settings(): React.JSX.Element {
  const {
    styles,
    theme,
    userColorScheme,
    setUserColorScheme,
    useSystemColorScheme,
    setUseSystemColorScheme,
  } = useStyles(getSettingStyles);

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <CustomPressable onPress={() => setIsModalVisible(true)}>
        <Icon name="gear" style={styles.gear} />
      </CustomPressable>

      {isModalVisible && (
        <CustomModal
          onClose={() => setIsModalVisible(false)}
          style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.settingContainer}>
              <CustomSwitch
                value={useSystemColorScheme}
                onChange={_ => setUseSystemColorScheme(!useSystemColorScheme)}
              />
              <Text style={styles.settingLabel}>
                {strings.useSystemColorScheme}
              </Text>
            </View>
            <View style={[styles.settingContainer]}>
              <CustomSwitch
                disabled={useSystemColorScheme}
                value={userColorScheme === 'dark'}
                onChange={_ =>
                  setUserColorScheme(
                    userColorScheme === null || userColorScheme === 'light'
                      ? 'dark'
                      : 'light',
                  )
                }
              />
              <Text style={styles.settingLabel}>{strings.useDarkScheme}</Text>
            </View>
          </View>
        </CustomModal>
      )}
    </>
  );
}
