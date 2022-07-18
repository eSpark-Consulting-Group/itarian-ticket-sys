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
    handleLabel?.(label, type); //? to Send the Selected Label to parent
  }, [label]);

  const renderList = ({item, index}: {item: string; index: number}) => {
    return (
      <TouchableOpacity
        style={{backgroundColor: colors.primary}}
        onPress={() => {
          setLabel(item); //? to Change the Label of the Dropdown
          handleToggle?.(type); //? to Toggle the Dropdown
        }}>
        <View
          style={{backgroundColor: colors.background, ...styles.itemContainer}}>
          <Text style={{color: colors.text, ...styles.itemText}}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text
        style={{
          color: colors.text,
          ...styles.labelText,
        }}>
        {title}
      </Text>
      <TouchableOpacity onPress={() => handleToggle?.(type)}>
        <View
          style={{
            borderColor: dark ? '#ffffff80' : '#00000080',
            ...styles.dropdownLabelContainer,
          }}>
          <View style={styles.dropdownLabelInner}>
            <Text style={{color: colors.text, ...styles.dropDownText}}>
              {label == '' ? 'Select an Item...' : label}
            </Text>
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
            ...styles.dropDownContainer,
            borderColor: dark ? '#ffffff80' : '#00000080',
          }}>
          <FlatList data={dataSource} renderItem={renderList} />
        </View>
      )}
      <View style={{height: 10}} />
    </View>
  );
};

export default CstmDropDown;
