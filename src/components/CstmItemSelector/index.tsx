import { useHookstate, State } from '@hookstate/core';
import {Theme, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Checkbox, FAB} from 'react-native-paper';
import { DarkTheme, LightTheme } from '../../theme/colors';
import {SelectFeilds} from '../../types';
import { globalState } from '../../utils/globalState';
import {SingleLineField} from '../FormFields';
import ModalView from '../ModalView';
import SimpleLoader from '../SimpleLoader';
import styles from './style';

const CstmItemSelector = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const themeValue: State<string> = useHookstate(globalState.theme);
  const [currChkInd, setCurrChkInd] = useState<number | any>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [list, setList] = useState<SelectFeilds[] | []>([]);

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
