import {Theme, useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {searchFromArray} from '../../utils/helperFunctions';
import {useUpdateEffect} from '../../utils/hooks';
import FloatButton from '../FloatButton';
import {SingleLineField} from '../FormFields';
import { Loader } from '../Loader';
import ModalHeader from '../ModalHeader';
import ModalView from '../ModalView';
import NotFound from '../NotFound';
import SearchBar from '../SearchBar';

const products = [
  {
    productId: 'P12341',
    description: 'Product description text',
    MfgPart: 'MFG12341',
    sku: 'SK2341',
  },
  {
    productId: 'P12342',
    description: 'Product description text',
    MfgPart: 'MFG12342',
    sku: 'SK12342',
  },
  {
    productId: 'P12343',
    description: 'Product description text',
    MfgPart: 'MFG12343',
    sku: 'SK12343',
  },
  {
    productId: 'P12344',
    description: 'Product description text',
    MfgPart: 'MFG12344',
    sku: 'SK12344',
  },
];
export const ProductListing = ({navigation, route}: any) => {
  const [dataSource, setDataSource] = useState<any[]>(products);
  const [searchValue, setSearchValue] = useState('');
  const [loader, setLoader] = useState<boolean>(false);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    if (route.params) {
      console.log("route.params.data", route.params.data)
      setSearchValue(route.params.data);
      searchFilterFunction(route?.params?.data)
    }
  }, [route.params]);

  const searchFilterFunction = async (text: string) => {
    console.log("text search filter function", text);
    var result = await searchFromArray({
      text: text || '',
      list: products,
      keys: ['productId', 'description', 'MfgPart', 'sku'],
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

  const renderProducts = ({item, index}: {item: any; index: number}) => {
    return (
      <View>
        <SingleLineField
          onPress={() => navigation?.navigate('Stack3', {screen: 'Product'})}
          subTitle={`#${item.productId} \n ${item?.description}`}
          title={` ${item?.MfgPart} ${item?.sku}`}
        />
      </View>
    );
  };

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
        data={dataSource}
        renderItem={renderProducts}
        ListEmptyComponent={
          <View style={{marginTop: 50}}>
            <NotFound label="Products" />
          </View>
        }
      />
      <FloatButton
        onPress={() => navigation?.navigate('Stack3', {screen: 'AddProduct'})}
      />
    </ModalView>
  );
};
