import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Theme} from '../../theme/colors';
import styles from './styles';

const CstmDropDown = ({dataSource}: {dataSource: string[]}) => {
  const [toggle, setToggle] = useState(false);
  const [label, setLabel] = useState('');
  const {colors, dark}: Theme = useTheme();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const renderList = ({item, index}: {item: string; index: number}) => {
    return (
      <TouchableOpacity
        style={{backgroundColor: colors.primary}}
        onPress={() => {
          setLabel(item);
          setToggle(false);
        }}>
        <View
          style={{flex: 1, padding: 12, backgroundColor: colors.background}}>
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggle}>
        <View
          style={{
            // backgroundColor: 'teal',
            borderWidth: 2,
            borderRadius: 2,
            borderColor: '#00000080',
          }}>
          <View style={{padding: 12}}>
            <Text>{label == '' ? 'Select an Item...' : label}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {toggle && (
        <View
          style={{
            height: 130,
            borderRightWidth: 2,
            borderBottomWidth: 2,
            borderLeftWidth: 2,
            borderColor: '#00000080',
          }}>
          <FlatList data={dataSource} renderItem={renderList} />
        </View>
      )}
    </View>
  );
};

export default CstmDropDown;
