import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Divider, ToggleButton} from 'react-native-paper';

import {SearchBar} from '../../components';
import styles from './style';
import {Theme} from '../../theme/colors';
import {EmptyListMsg, CstmSwitchSelector} from '../../components';
import {
  contactsList,
  Contacts as ContactsType,
} from '../../constants/SampleArrays';

const InOutBoardScreen = () => {
  const {colors, dark}: Theme = useTheme();
  const [value, setValue] = React.useState('left');

  const renderList = ({item, index}: {item: ContactsType; index: number}) => {
    return (
      <View style={styles.listContainer}>
        <Pressable
          onPress={() => console.log('Hello')}
          android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
          <View style={{padding: moderateScale(15)}}>
            <Text
              style={{
                color: colors.text,
              }}>
              {item.name}
            </Text>
          </View>
        </Pressable>
        {index !== contactsList.length - 1 && (
          <Divider
            style={{backgroundColor: colors.text, ...styles.dividerStyle}}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.header,
        }}>
        <SearchBar withTag={false} placeholder={'Search Members...'} />
      </View>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.subHeader,
        }}>
        <View
          style={{
            padding: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CstmSwitchSelector
            selectionMode={1}
            roundCorner={true}
            option1={'In'}
            option2={'Out'}
            onSelectSwitch={() => {
              console.log('Hello');
            }}
            selectionColor={colors.primary}
          />
        </View>
      </View>
      {contactsList.length !== 0 ? (
        <FlatList data={contactsList} renderItem={renderList} />
      ) : (
        <NotFound />
      )}
    </View>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Contacts" />
    </View>
  );
};

export default InOutBoardScreen;
