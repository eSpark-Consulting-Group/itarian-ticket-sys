import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {Searchbar as Search, Menu} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import FA from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import AD from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Theme} from '../../theme/colors';
import {moderateScale} from 'react-native-size-matters';
import styles from './style';

const MenuItem = ({
  itemName,
  onPress,
  leftIcon,
  rightIcon,
  textColor = '#000',
  checkVisible,
}: {
  itemName: string;
  onPress: () => void;
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: string;
  checkVisible?: boolean;
}) => {
  return (
    <Pressable onPress={onPress} android_ripple={{color: '#635a5a5c'}}>
      <View style={styles.menuItemButtonStyle}>
        <View style={{flexDirection: 'row'}}>
          {leftIcon}
          <Text style={{color: textColor, marginHorizontal: 5}}>
            {itemName}
          </Text>
        </View>
        <View style={{width: moderateScale(20)}}>
          {checkVisible && rightIcon}
        </View>
      </View>
    </Pressable>
  );
};

const SearchBar = () => {
  const {colors, dark}: Theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);

  const onChangeSearch = (query: string): void => setSearchQuery(query);
  const showMenu = (): void => setVisible(!visible);
  const hideMenu = (): void => setVisible(false);

  return (
    <View style={{backgroundColor: colors.background, ...styles.container}}>
      <View style={{backgroundColor: colors.background, ...styles.adjuster}} />
      <View
        style={{backgroundColor: colors.background, ...styles.tagContainer}}>
        <Menu
          visible={visible}
          onDismiss={hideMenu}
          contentStyle={{backgroundColor: colors.background}}
          anchor={
            <View
              style={{
                marginTop: moderateScale(9, 0),
                height: moderateScale(47, 0),
              }}>
              <TouchableOpacity
                style={{borderColor: colors.primary, ...styles.tagButtonStyle}}
                onPress={showMenu}>
                <Ionicons
                  name="pricetags-outline"
                  color={colors.primary}
                  size={22}
                />
                <FA name="chevron-down" color={colors.primary} size={12} />
              </TouchableOpacity>
            </View>
          }>
          <MenuItem
            itemName="Tickets"
            textColor={colors.text}
            onPress={() => console.log('Bakwas')}
            leftIcon={
              <Ionicons
                name="pricetags-outline"
                color={colors.primary}
                size={22}
              />
            }
            checkVisible={false}
            rightIcon={
              <Feather name="check" color={colors.primary} size={20} />
            }
          />
          <MenuItem
            itemName="Companies"
            textColor={colors.text}
            onPress={() => console.log('Hello')}
            leftIcon={
              <MCI
                name="office-building-marker"
                size={22}
                color={colors.primary}
              />
            }
            checkVisible={false}
            rightIcon={
              <Feather
                name="check"
                color={colors.primary}
                style={{marginLeft: 10}}
                size={20}
              />
            }
          />
          <MenuItem
            itemName="Contacts"
            textColor={colors.text}
            onPress={() => console.log('Bakwas 2')}
            leftIcon={<AD name="contacts" size={22} color={colors.primary} />}
            checkVisible={false}
            rightIcon={
              <Feather name="check" color={colors.primary} size={20} />
            }
          />
          <MenuItem
            itemName="Configurations"
            textColor={colors.text}
            onPress={() => console.log('Bakwas 3')}
            leftIcon={
              <MCI name="puzzle-outline" size={22} color={colors.primary} />
            }
            checkVisible={false}
            rightIcon={
              <Feather name="check" color={colors.primary} size={20} />
            }
          />
        </Menu>
      </View>
      <View style={styles.adjuster} />
      <View
        style={{
          backgroundColor: colors.background,
          ...styles.searchInputContainer,
        }}>
        <Search
          placeholder="Search"
          value=""
          selectionColor={colors.primary}
          placeholderTextColor={dark ? '#ffffff8a' : '#0000008a'}
          iconColor={dark ? '#ffffff8a' : '#0000008a'}
          onChangeText={onChangeSearch}
          inputStyle={{color: colors.text}}
          style={styles.inputStyle}
        />
      </View>
    </View>
  );
};

export default SearchBar;
