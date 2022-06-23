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

const MenuItem = ({
  itemName,
  onPress,
  leftIcon,
  rightIcon,
  checkVisible,
}: {
  itemName: string;
  onPress: () => void;
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
  checkVisible?: boolean;
}) => {
  const {colors}: Theme = useTheme();
  return (
    <Pressable onPress={onPress} android_ripple={{color: '#635a5a5c'}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          {leftIcon}
          <Text style={{color: colors.text, marginHorizontal: 5}}>
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
  const {colors}: Theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);

  const onChangeSearch = (query: string): void => setSearchQuery(query);
  const showMenu = (): void => setVisible(!visible);
  const hideMenu = (): void => setVisible(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        elevation: 2,
      }}>
      <View
        style={{
          width: '20%',
          backgroundColor: '#fff',
        }}>
        <Menu
          visible={visible}
          onDismiss={hideMenu}
          anchor={
            <View style={{height: '100%'}}>
              <TouchableOpacity
                style={{
                  padding: 12,
                  margin: 8,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: colors.primary,
                }}
                onPress={showMenu}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                  }}>
                  <FA
                    name="tag"
                    color={colors.primary}
                    size={22}
                    style={{transform: [{rotateY: '180deg'}]}}
                  />
                  <FA name="chevron-down" color={colors.primary} size={12} />
                </View>
              </TouchableOpacity>
            </View>
          }>
          <MenuItem
            itemName="Tickets"
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
            onPress={() => console.log('Bakwas 2')}
            leftIcon={<AD name="contacts" size={22} color={colors.primary} />}
            checkVisible={false}
            rightIcon={
              <Feather name="check" color={colors.primary} size={20} />
            }
          />
          <MenuItem
            itemName="Configurations"
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
      <View
        style={{
          width: '80%',
          backgroundColor: '#ffffff',
          padding: 8,
          height: '100%',
        }}>
        <Search
          placeholder="Search"
          value=""
          onChangeText={onChangeSearch}
          style={{
            elevation: 0,
            backgroundColor: '#80808040',
            borderRadius: 15,
          }}
        />
      </View>
    </View>
  );
};

export default SearchBar;
