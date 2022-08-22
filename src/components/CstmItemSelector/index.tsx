import {Theme, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Checkbox, FAB} from 'react-native-paper';
import {SelectFeilds} from '../../types';
import {SingleLineField} from '../FormFields';
import ModalView from '../ModalView';
import SimpleLoader from '../SimpleLoader';
import styles from './style';

const CstmItemSelector = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
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

  const onSubmit = () => {
    navigation.navigate(route?.params?.stack, {
      screen: route?.params?.from,
      params: {
        ...route?.params,
        selected: list[currChkInd],
        item: route?.params?.item,
      },
    });
  };

  return (
    <ModalView>
      {list?.length > 0 && (
        <FlatList
          data={list}
          renderItem={({item, index}) => (
            <SingleLineField
              key={item.name}
              title={item.name}
              onPress={() => setCurrChkInd(index)}
              leftChild={
                <Checkbox
                  status={currChkInd == index ? 'checked' : 'unchecked'}
                  color={colors.primary}
                  onPress={() => setCurrChkInd(index)}
                />
              }
            />
          )}
        />
      )}
      {loader && <SimpleLoader />}
      <FAB
        theme={{colors: {background: '#111'}}}
        style={styles.floatButton}
        icon={'check'}
        color="#fff"
        visible={true}
        onPress={onSubmit}
      />
    </ModalView>
  );
};

export default CstmItemSelector;
