import {Theme, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {CstmPressable} from '../CstmPressable';
import {Checkbox, Divider} from 'react-native-paper';
import {DarkTheme, LightTheme} from '../../theme/colors';
import {styles} from './styles';
import {NoteTypes_DIR} from '../../constants/SampleArrays';
import FloatButton from '../FloatButton';
import {handleAddNote, searchFromArray} from '../../utils/helperFunctions';
import {useUpdateEffect} from '../../utils/hooks';
import ModalHeader from '../ModalHeader';
import SearchBar from '../SearchBar';
import {Loader} from '../Loader';
import NotFound from '../NotFound';

type Task = {
  id: number;
  summary?: string;
};

const tasks = [
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
];
export const Tasks = ({navigation, route}: any) => {
  const [dataSource, setDataSource] = useState<Task[]>(tasks);
  const {dark, colors}: Theme = useTheme();
  const [selectable, setSelectable] = useState(false);
  const [selectedIndex, setselectedIndex] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [loader, setLoader] = useState<boolean>(false);
  const [clear, setClear] = useState(false);

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
    setselectedIndex([]);
  };

  const searchFilterFunction = async (text: string) => {
    var result = await searchFromArray({
      text: text || '',
      list: tasks,
      keys: ['summary'],
    });
    setDataSource(result);
  };

  const handleSubmit = async () => {
    setLoader(true);
    await searchFilterFunction(searchValue);
    setLoader(false);
  };

  const handleClear = () => {
    setSearchValue('');
    setClear(true);
  };

  useUpdateEffect(() => {
    if (clear) {
      handleSubmit();
      setClear(false);
    }
  }, [clear]);

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
            !selectable
              ? handleAddNote(
                  navigation,
                  route,
                  NoteTypes_DIR,
                  'Tasks',
                  'Stack2',
                )
              : onLongPress(item, index);
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
      <ModalHeader empty searchHeader>
        <SearchBar
          withTag={false}
          placeholder={'Search...'}
          fontSize={'large'}
          value={searchValue}
          setChangeText={value => setSearchValue(value)}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </ModalHeader>
      <Loader isShow={loader} />
      <FlatList
        data={dataSource}
        renderItem={renderTask}
        ListEmptyComponent={
          <View style={{marginTop: 50}}>
            <NotFound label="Task" />
          </View>
        }
      />
      <FloatButton
        onPress={() => navigation.navigate('Stack3', {screen: 'AddTask'})}
      />
    </View>
  );
};
