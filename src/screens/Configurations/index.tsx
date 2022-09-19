import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Theme, useNavigation, useTheme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  SearchBar,
  EmptyListMsg,
  SimpleLoader,
  FloatButton,
} from '../../components';
import {configurationsList} from '../../constants/SampleArrays';
import {Configuration} from '../../types';
import {useUpdateEffect} from '../../utils/hooks';

import styles from './style';
import {CstmPressable} from '../../components';
import {searchFromArray} from '../../utils/helperFunctions';

const Configurations = ({route}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    if (route.params) {
      setSearchValue(route.params.data);
      // handleSubmit(route.params.data);
    }
  }, [route.params]);

  const [filteredConfigurations, setFilteredConfigurations] =
    useState(configurationsList);

  const handleSubmit = (val?: string) => {
    setLoading(true);
    searchFilterFunction(searchValue);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const searchFilterFunction = async (text: string) => {
    var result = await searchFromArray({
      text: text,
      list: configurationsList,
      keys: ['name', 'company_name', 'model', 'serial', 'tag'],
    });
    setFilteredConfigurations(result);
  };

  const handleClear = () => {
    setSearchValue('');
    setClear(true);
  };

  useUpdateEffect(() => {
    if (clear) {
      setClear(false);
      handleSubmit();
    }
  }, [clear]);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.header,
        }}>
        <SearchBar
          withTag={false}
          placeholder={'Search Configurations'}
          fontSize={'large'}
          value={searchValue}
          setChangeText={value => setSearchValue(value)}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </View>
      {loading ? (
        <SimpleLoader />
      ) : (
        <RenderConfigurations listData={filteredConfigurations} />
      )}
    </View>
  );
};

export const RenderConfigurations = ({
  listData = configurationsList,
}: {
  listData?: Configuration[];
}) => {
  const {colors, dark}: Theme = useTheme();
  const navigation: any = useNavigation();

  const renderList = ({item, index}: {item: Configuration; index: number}) => {
    return (
      <View style={styles.listContainer}>
        <CstmPressable
          onPress={() =>
            navigation.navigate('Stack1', {
              screen: 'Configure1',
            })
          }
          android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
          <View style={styles.listItemContainer}>
            <View style={styles.iconContainer}>
              <View
                style={{backgroundColor: colors.primary, ...styles.iconStyle}}>
                <MCI name="puzzle-outline" size={28} color={'#ffffff'} />
              </View>
              <View style={{height: 10}} />
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: colors.text,
                    ...styles.title,
                  }}>
                  {item.name}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: colors.text,
                    ...styles.subtitle,
                  }}>
                  {item.model ? item.model : 'No model'}
                </Text>
                <Divider
                  style={{
                    backgroundColor: colors.text,
                    ...styles.dividerStyle,
                  }}
                />
                <Text
                  style={{
                    color: colors.text,
                    ...styles.subtitle,
                  }}>
                  {item.tag ? item.tag : 'No Tag'}
                </Text>
                <Divider
                  style={{
                    backgroundColor: colors.text,
                    ...styles.dividerStyle,
                  }}
                />
                <Text
                  style={{
                    color: colors.text,
                    ...styles.subtitle,
                  }}>
                  {item.serial ? item.serial : 'No Serial'}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <MCI
                  name="office-building-marker-outline"
                  size={15}
                  color={colors.text}
                  style={{opacity: 0.5}}
                />
                <Text
                  style={{
                    color: colors.text,
                    ...styles.subtitle,
                  }}>
                  {item.company_name}
                </Text>
              </View>
            </View>
          </View>
        </CstmPressable>
        {index !== listData.length - 1 && (
          <Divider
            style={{
              backgroundColor: colors.text,
              ...styles.listDividerStyle,
            }}
          />
        )}
      </View>
    );
  };

  return (
    <>
      {listData.length !== 0 ? (
        <FlatList data={listData} renderItem={renderList} />
      ) : (
        <NotFound />
      )}
      <FloatButton
        onPress={() =>
          navigation.navigate('Stack1', {screen: 'BarcodeScanner'})
        }
      />
    </>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Configurations" />
    </View>
  );
};

export default Configurations;
