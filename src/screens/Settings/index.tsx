import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {List, Divider, Switch, Menu} from 'react-native-paper';
import {useState as useHState, State} from '@hookstate/core';
import {moderateScale} from 'react-native-size-matters';

import {globalState} from '../../utils/globalState';
import {Theme} from '../../theme/colors';
import {useUpdateEffect} from '../../utils/hooks';
import {screenItemList} from '../../constants/SampleArrays';
import {CstmPressable} from '../../components/CstmPressable';

const SettingsScreen = () => {
  const themeValue: State<string> = useHState(globalState.theme);
  const dScreen: State<string> = useHState(globalState.defaultScreenId);
  const dSName: State<string> = useHState(globalState.defaultScreenName);
  const [isSwitchOn, setIsSwitchOn] = useState(
    themeValue.get() == 'light' ? false : true,
  );
  const [visible, setVisible] = useState(false);
  const [defaultScreen, setdefaultScreen] = useState(dSName.get());

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  useUpdateEffect(() => {
    // watch the swtich state for theme change
    if (isSwitchOn) {
      themeValue.set('dark');
      console.log('chala');
    } else {
      themeValue.set('light');
    }
  }, [isSwitchOn]);

  const handleDefaultSwitch = (id: string, name: string) => {
    dScreen.set(id);
    dSName.set(name);
    setdefaultScreen(name);
  };
  const hideMenu = () => {
    setVisible(false);
  };
  const openMenu = () => {
    setVisible(true);
  };

  const {colors, dark}: Theme = useTheme();
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
        <Divider
          style={{
            backgroundColor: colors.text,
            opacity: 0.25,
            transform: [{scale: 2}],
          }}
        />
        <List.Subheader style={{color: colors.text, opacity: 0.6}}>
          Default Home Screen
        </List.Subheader>
        <TouchableOpacity onPress={openMenu}>
          <List.Item
            title={defaultScreen}
            titleStyle={{color: colors.text, opacity: 0.75}}
            right={() => (
              <View style={{flexDirection: 'row'}}>
                <Menu
                  visible={visible}
                  onDismiss={hideMenu}
                  style={{
                    width: moderateScale(170),
                    height: moderateScale(200),
                  }}
                  contentStyle={{backgroundColor: colors.background}}
                  anchor={
                    <List.Icon
                      icon="chevron-right"
                      color={colors.primary}
                      style={{opacity: 1}}
                    />
                  }>
                  <FlatList
                    data={screenItemList}
                    renderItem={({item, index}) => {
                      return (
                        <MenuItem
                          itemName={item.name}
                          textColor={colors.text}
                          dark={dark}
                          onPress={() => {
                            hideMenu();
                            handleDefaultSwitch(item.id, item.name);
                          }}
                        />
                      );
                    }}
                  />
                </Menu>
              </View>
            )}
          />
        </TouchableOpacity>
        <Divider style={{backgroundColor: colors.text, opacity: 0.25}} />
      </List.Section>
    </View>
  );
};

//*---------- Helper Components

const MenuItem = ({
  itemName,
  onPress,
  leftIcon,
  rightIcon,
  textColor = '#000',
  checkVisible,
  dark,
}: {
  itemName: string;
  onPress: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: string;
  checkVisible?: boolean;
  dark?: boolean;
}) => {
  return (
    <CstmPressable
      onPress={onPress}
      android_ripple={{color: dark ? '#ffffff1a' : '#0000000e'}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          {leftIcon}
          <Text style={{color: textColor, marginHorizontal: 5}}>
            {itemName}
          </Text>
        </View>
        <View
          style={{
            width: moderateScale(30),
            flexDirection: 'row-reverse',
          }}>
          {checkVisible && rightIcon}
        </View>
      </View>
    </CstmPressable>
  );
};

export default SettingsScreen;
