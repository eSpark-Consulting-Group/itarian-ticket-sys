import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {List, Divider, Switch} from 'react-native-paper';
import {useState as useHookState, State} from '@hookstate/core';

import {globalState} from '../../utils/globalState';
import {Theme} from '../../theme/colors';
import styles from './style';

const SettingsScreen = () => {
  const themeValue: State<string> = useHookState(globalState.theme);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    // watch the swtich state for theme change
    if (isSwitchOn) {
      themeValue.set('dark');
    } else {
      themeValue.set('light');
    }
  }, [isSwitchOn]);

  const {colors}: Theme = useTheme();
  return (
    <View>
      <List.Section>
        <List.Subheader style={{color: colors.text, opacity: 0.6}}>
          Theme
        </List.Subheader>
        <List.Item
          title="Current Theme"
          titleStyle={{color: colors.text, opacity: 0.75}}
          right={() => (
            <View style={{flexDirection: 'row'}}>
              <List.Icon
                icon="weather-sunny"
                color={colors.primary}
                style={{opacity: 1}}
              />
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                thumbColor={colors.primary}
                color={colors.primary}
                trackColor={{true: '#5b57578f', false: '#5b57578f'}}
              />
              <List.Icon icon="weather-night" color={colors.primary} />
            </View>
          )}
        />
        <Divider style={{backgroundColor: colors.text, opacity: 0.25}} />
      </List.Section>
    </View>
  );
};

export default SettingsScreen;
