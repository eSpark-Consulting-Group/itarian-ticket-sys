import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {useHookstate, State} from '@hookstate/core';
import {Theme, useTheme} from '@react-navigation/native';

import {DarkTheme, LightTheme} from '../../theme/colors';
import {SelectFields} from '../../types';
import {globalState} from '../../utils/globalState';
import {useUpdateEffect} from '../../utils/hooks';
import {SingleLineField} from '../FormFields';
import ModalHeader from '../ModalHeader';
import ModalView from '../ModalView';
import SearchBar from '../SearchBar';
import SimpleLoader from '../SimpleLoader';

const CstmItemSelector = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const themeValue: State<string> = useHookstate(globalState.theme);
  const [currChkInd, setCurrChkInd] = useState<number | any>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [list, setList] = useState<SelectFields[] | []>([]);
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
      let listData = [...route?.params?.data];
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
      handleSubmit();
      setClear(false);
    }
  }, [clear]);

  useEffect(() => {
    if (!searchValue) {
      setList(route?.params?.data);
    }
    setLoader(false);
  }, [route?.params]);

  useEffect(() => {
    const selectedInd = route?.params?.data?.findIndex(
      (val: any) => val.id == route?.params?.selected?.id,
    );
    if (selectedInd != -1) setCurrChkInd(route?.params?.data[selectedInd]?.id);

    return () => {
      setCurrChkInd(0); // This worked for me
    };
  }, []);

  const selectItem = (ind: number) => {
    const selectedInd = route?.params?.data?.findIndex(
      (val: any) => val.id == ind,
    );
    navigation?.setParams({
      ...route?.params,
      selected: route?.params?.data[selectedInd],
    });
    setCurrChkInd(ind);
  };

  return (
    <ModalView>
      {route?.params?.searchable && (
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
      )}
      {list?.length > 0 && (
        <FlatList
          data={list}
          renderItem={({item, index}) => {
            return (
              <SingleLineField
                key={item.name}
                title={item.name}
                onPress={() => selectItem(item?.id)}
                leftChild={
                  <Checkbox
                    status={currChkInd == item?.id ? 'checked' : 'unchecked'}
                    color={colors.primary}
                    theme={
                      themeValue.get() === 'light' ? LightTheme : DarkTheme
                    }
                    onPress={() => selectItem(item?.id)}
                  />
                }
              />
            );
          }}
        />
      )}
      {loader && <SimpleLoader />}
    </ModalView>
  );
};

export default CstmItemSelector;
