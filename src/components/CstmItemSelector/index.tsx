import { useHookstate, State } from '@hookstate/core';
import {Theme, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Checkbox, FAB} from 'react-native-paper';
import { DarkTheme, LightTheme } from '../../theme/colors';
import {SelectFeilds} from '../../types';
import { globalState } from '../../utils/globalState';
import { useUpdateEffect } from '../../utils/hooks';
import {SingleLineField} from '../FormFields';
import ModalView from '../ModalView';
import SearchBar from '../SearchBar';
import SimpleLoader from '../SimpleLoader';
import styles from './style';

const CstmItemSelector = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const themeValue: State<string> = useHookstate(globalState.theme);
  const [currChkInd, setCurrChkInd] = useState<number | any>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [list, setList] = useState<SelectFeilds[] | []>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [clear, setClear] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    searchFilterFunction(searchValue);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = route?.params?.data?.filter((item: any) => {
        const itemData = `${item.name.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setList(newData);
    } else {
      let listData = [...route?.params?.data]
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setList(listData);
    }
  };


  const handleClear = () => {
    setSearchValue('');
    setClear(true);
  };

  useUpdateEffect(() => {
    if (clear) {
      console.log('done');
      handleSubmit();
      setClear(false);
    }
  }, [clear]);


  useEffect(() => {
    setList(route?.params?.data);
    const selectedInd = route?.params?.data?.findIndex(
      (val: any) => val.id == route?.params?.selected?.id,
    );
    if (selectedInd != -1) setCurrChkInd(selectedInd);
    setLoader(false);
  }, [route?.params]);

  return (
    <ModalView>
       {route?.params?.searchable && 
       <SearchBar
          withTag={false}
          placeholder={'Search...'}
          fontSize={'large'}
          value={searchValue}
          setChangeText={value => setSearchValue(value)}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />}
      {list?.length > 0 && (
        <FlatList
          data={list}
          renderItem={({item, index}) => (
            <SingleLineField
              key={item.name}
              title={item.name}
              onPress={() => {
                navigation?.setParams({
                  ...route?.params,
                  selected: list[index],
                });
                setCurrChkInd(index);
              }}
              leftChild={
                <Checkbox
                  status={currChkInd == index ? 'checked' : 'unchecked'}
                  color={colors.primary}
                  theme={themeValue.get() === 'light' ? LightTheme : DarkTheme}
                  onPress={() => setCurrChkInd(index)}
                />
              }
            />
          )}
        />
      )}
      {loader && <SimpleLoader />}
    </ModalView>
  );
};

export default CstmItemSelector;
