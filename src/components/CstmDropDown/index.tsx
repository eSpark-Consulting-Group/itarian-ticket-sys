import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Theme} from '../../theme/colors';
import styles from './styles';
import {useUpdateEffect} from '../../utils/hooks';
import MI from 'react-native-vector-icons/MaterialIcons';

const CstmDropDown = ({
  dataSource,
  handleLabel,
  type,
  toggleValue,
  handleToggle,
  title,
}: {
  dataSource: string[];
  handleLabel?: (value: string, type: string) => void;
  type: string;
  toggleValue: boolean;
  handleToggle?: (type: string) => void;
  title?: string;
}) => {
  const [label, setLabel] = useState('');
  const {colors, dark}: Theme = useTheme();

  useUpdateEffect(() => {
    handleLabel?.(label, type);
  }, [toggleValue]);

  const renderList = ({item, index}: {item: string; index: number}) => {
    return (
      <TouchableOpacity
        style={{backgroundColor: colors.primary}}
        onPress={() => {
          setLabel(item);
        }}>
        <View style={{flex: 1, padding: 8, backgroundColor: colors.background}}>
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.text,
          opacity: 0.7,
          fontSize: 14,
          fontFamily: 'sans-serif-medium',
          height: 25,
        }}>
        {title}
      </Text>
      <TouchableOpacity onPress={() => handleToggle?.(type)}>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 2,
            borderColor: '#00000080',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 8,
            }}>
            <Text>{label == '' ? 'Select an Item...' : label}</Text>
            {toggleValue ? (
              <MI name="arrow-drop-up" color={colors.text} size={22} />
            ) : (
              <MI name="arrow-drop-down" color={colors.text} size={22} />
            )}
          </View>
        </View>
      </TouchableOpacity>
      {toggleValue && (
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
      <View style={{height: 10}} />
    </View>
  );
};

export default CstmDropDown;
