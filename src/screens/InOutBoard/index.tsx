import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';

import {SearchBar, SimpleLoader} from '../../components';
import styles from './style';
import {Theme} from '../../theme/colors';
import {EmptyListMsg, CstmSwitchSelector} from '../../components';
import {
  contactsList,
  Contacts as ContactsType,
} from '../../constants/SampleArrays';

const InOutBoardScreen = () => {
  const {colors, dark}: Theme = useTheme();
  const [selection, setSelection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState(Array<ContactsType>);

  const handleSwitch = () => {
    if (selection == 1) {
      let news = [...contactsList].filter((item) => !item.inOffice);
      setMembers(news);
      setSelection(2);
    } else if (selection == 2) {
      let news = [...contactsList].filter(item => item.inOffice);
      setMembers(news);
      setSelection(1);
    } else {
      return
    }
  };

  useEffect(() => {
    let news = [...contactsList].filter(item => item.inOffice);
    setMembers(news);
    setIsLoading(false);
  }, [])

  useEffect(() => {
    console.log('Current Selection', selection);
  }, [selection]);

  const renderList = ({item, index}: {item: ContactsType; index: number}) => {
    return (
      <View style={styles.listContainer}>
        <View style={{padding: moderateScale(15)}}>
          <Text
            style={{
              color: colors.text,
            }}>{item.name}</Text>
        </View>
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
        <SearchBar
          withTag={false}
          placeholder={'Search Members...'}
          fontSize={'large'}
        />
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
            selectionMode={selection}
            roundCorner={true}
            option1={'In'}
            option2={'Out'}
            onSelectSwitch={handleSwitch}
            selectionColor={colors.primary}
          />
        </View>
      </View>
      { isLoading ?
        <SimpleLoader/> :
        contactsList.length !== 0 ? (
          <FlatList data={members} renderItem={renderList} />
          ) : (
            <NotFound />
            )
          }
    </View>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Members" />
    </View>
  );
};

export default InOutBoardScreen;
