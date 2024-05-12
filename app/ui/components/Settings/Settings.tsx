import React from 'react';
import {Switch, Text, View} from 'react-native';

import {useStyles} from '@theme';
import {getSettingStyles} from './styles';

export function Settings(): React.JSX.Element {
  const {
    styles,
    userColorScheme,
    setUserColorScheme,
    useSystemColorScheme,
    setUseSystemColorScheme,
  } = useStyles(getSettingStyles);

  // const theme = useTheme();
  // const itemStyles = useMemo(() => {
  //   console.log('Item: Use memo called');
  //   return getItemStyles(theme);
  // }, [theme]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.settingContainer}>
          <Switch
            value={useSystemColorScheme}
            onChange={_ => setUseSystemColorScheme(!useSystemColorScheme)}
          />
          <Text>Use system theme</Text>
        </View>
        <View style={[styles.settingContainer]}>
          <Switch
            disabled={useSystemColorScheme}
            value={userColorScheme === 'dark'}
            onChange={_ =>
              setUserColorScheme(userColorScheme === 'light' ? 'dark' : 'light')
            }
          />
          <Text>Use dart theme</Text>
        </View>
      </View>
    </>
  );
}
