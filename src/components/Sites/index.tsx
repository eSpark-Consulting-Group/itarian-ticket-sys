import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useHookstate, State} from '@hookstate/core';

import {RoundedIcon, SingleLineField} from '../../components';
import {CompanySites, ContactList, SelectFields} from '../../types';
import {redirectToMap, searchFromArray} from '../../utils/helperFunctions';
import {globalState} from '../../stores/globalAppState';
import {ComapanySites} from '../../constants/SampleArrays';
import {useUpdateEffect} from '../../utils/hooks';
import ModalHeader from '../ModalHeader';
import SearchBar from '../SearchBar';
import {Loader} from '../Loader';
import ModalView from '../ModalView';
import NotFound from '../NotFound';

interface Item {
  headerTitle?: string;
  title: string;
  subTitle?: string;
  enable?: boolean;
  rightIcon?: string;
  titleWidth?: number;
  list?: SelectFields[];
  selectedItem?: SelectFields;
  leftIcon?: string;
  searchable?: boolean;
  rightChild?: React.ReactNode;
  contacts?: ContactList[] | null | undefined;
}

const Sites = () => {
  const dNavName: State<string> = useHookstate(
    globalState.defaultnNavigationName,
  );
  const [defaultNav, setdefaultNav] = useState(dNavName.get());
  const [Ds, setDs] = useState<CompanySites[]>(ComapanySites);
  const [searchValue, setSearchValue] = useState('');
  const [loader, setLoader] = useState<boolean>(false);
  const [clear, setClear] = useState(false);

  const searchFilterFunction = async (text: string) => {
    var result = await searchFromArray({
      text: text || '',
      list: ComapanySites,
      keys: ['company_name', 'type'],
    });
    setDs(result);
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

  return (
    <ModalView>
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
        data={Ds}
        renderItem={({item, index}: any) => {
          return (
            <SingleLineField
              key={index}
              title={item?.company_name || ''}
              subTitle={item?.type}
              rightChild={
                <RoundedIcon
                  icon="map-marker-outline"
                  onPress={() =>
                    redirectToMap(34.923264, -120.429214, defaultNav)
                  }
                />
              }
              enable={false}
            />
          );
        }}
        ListEmptyComponent={
          <View style={{marginTop: 50}}>
            <NotFound label="Site" />
          </View>
        }
      />
    </ModalView>
  );
};

export default Sites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  priorityBox: {
    backgroundColor: 'yellow',
    borderWidth: 1,
    height: 10,
    width: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.8,
  },
  subTitle: {
    opacity: 0.6,
  },
});
