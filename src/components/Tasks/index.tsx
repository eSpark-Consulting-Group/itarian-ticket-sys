import {Theme, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import {CstmPressable} from '../CstmPressable';
import {Checkbox, Divider} from 'react-native-paper';
import {DarkTheme, LightTheme} from '../../theme/colors';
import {color} from 'react-native-reanimated';
import {styles} from './styles';
import {NoteTypes_DIR} from '../../constants/SampleArrays';
import FloatButton from '../FloatButton';

type Task = {
  id: number;
  summary?: string;
};
export const Tasks = ({navigation, route}: any) => {
  const [dataSource, setDataSource] = useState<Task[]>([
    {
      id: 1,
      summary: 'Task 1',
    },
    {
      id: 2,
      summary: 'Task 2',
    },
    {
      id: 3,
      summary: 'Task 3',
    },
    {
      id: 4,
      summary: 'Task 4',
    },
  ]);
  const {dark, colors}: Theme = useTheme();
  const [selectable, setSelectable] = useState(false);
  const [selectedIndex, setselectedIndex] = useState<number[]>([]);

  const onLongPress = (item: Task, index: number) => {
    setSelectable(true);
    const selectedItem: number[] = [...selectedIndex];
    const selectedInd = selectedItem?.findIndex(value => value === index);
    selectedInd != -1
      ? selectedItem.splice(selectedInd, 1)
      : selectedItem.push(index);
    setselectedIndex(selectedItem);
  };

  const onDelete = () => {
    console.log('Item deleted Called');
  };

  const onClear = () => {
    setselectedIndex([])
  };

  useEffect(() => {
    selectedIndex?.length == 0 && setSelectable(false);
    navigation?.setParams({
      ...route.params,
      deleteEnabled: selectedIndex?.length != 0,
      onDelete: onDelete,
      onClear: onClear,
    });
  }, [selectedIndex]);

  const renderTask = ({item, index}: {item: Task; index: number}) => {
    return (
      <>
        <CstmPressable
          style={{padding: 10}}
          onPress={() => {
            !selectable ? navigation.navigate('Stack2', {
              screen: 'ComposeNote',
              params: {
                from: 'Tasks',
                item: 'GoneTo',
                data: NoteTypes_DIR,
                selected: {},
                stack: 'Stack2',
                title: route?.params?.title,
                headerTitle: 'Note Type',
                status: route?.params?.status,
              },
            })
            :
            onLongPress(item, index);
          }}
          otherProps={{
            onLongPress: () => onLongPress(item, index),
          }}>
          <View style={{flexDirection: 'row'}}>
            {selectable && (
              <Checkbox
                status={
                  selectedIndex?.includes(index) ? 'checked' : 'unchecked'
                }
                color={colors.primary}
                theme={dark ? DarkTheme : LightTheme}
                onPress={() => {
                  onLongPress(item, index);
                }}
              />
            )}
            <View style={{paddingHorizontal: 10}}>
              <Text style={{color: colors?.text}}>Summary</Text>
              <Text style={{color: colors?.text}}>{item?.summary}</Text>
            </View>
          </View>
        </CstmPressable>
        <Divider
          style={{
            backgroundColor: colors.text,
            ...styles.listDividerStyle,
          }}
        />
      </>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList data={dataSource} renderItem={renderTask} />
      <FloatButton
        onPress={() => navigation.navigate('Stack3', {screen: 'AddTask'})}
      />
    </View>
  );
};
