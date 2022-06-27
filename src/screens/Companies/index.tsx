import {View, Text, FlatList, Pressable} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {SearchBar} from '../../components';
import styles from './style';
import {Colors, Theme} from '../../theme/colors';
import {EmptyListMsg} from '../../components';
import {companiesList, Companines} from '../../constants/SampleArrays';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../../constants/Dimensions';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';

const Companies = () => {
  const {colors, dark}: Theme = useTheme();

  const renderList = ({item, index}: {item: Companines; index: number}) => {
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
        {index !== companiesList.length - 1 && (
          <Divider
            style={{
              backgroundColor: colors.text,
              opacity: 0.2,
              transform: [{scale: 2}],
            }}
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
        <SearchBar withTag={false} placeholder={'Search Companies'} />
      </View>
      {companiesList ? (
        <FlatList data={companiesList} renderItem={renderList} />
      ) : (
        <NotFound />
      )}
    </View>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Companies" />
    </View>
  );
};

export default Companies;
