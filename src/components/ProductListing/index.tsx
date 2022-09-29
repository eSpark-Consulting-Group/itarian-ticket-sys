import {Theme, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import FloatButton from '../FloatButton';
import {SingleLineField} from '../FormFields';

export const ProductListing = ({navigation, route}: any) => {
  const [dataSource, setDataSource] = useState<any[]>([
    {
      productId: 'P12341',
      description: 'Product description text',
      MfgPart: 'MFG123',
      sku: 'SK2341',
    },
    {
      productId: 'P12341',
      description: 'Product description text',
      MfgPart: 'MFG123',
      sku: 'SK2341',
    },
    {
      productId: 'P12341',
      description: 'Product description text',
      MfgPart: 'MFG123',
      sku: 'SK2341',
    },
    {
      productId: 'P12341',
      description: 'Product description text',
      MfgPart: 'MFG123',
      sku: 'SK2341',
    },
  ]);

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
    <View style={{flex: 1}}>
      <FlatList data={dataSource} renderItem={renderProducts} />
      <FloatButton
        onPress={() => navigation?.navigate('Stack3', {screen: 'AddProduct'})}
      />
    </View>
  );
};
