import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {Theme} from '../../theme/colors';
import {SearchBar, EmptyListMsg, SimpleLoader} from '../../components';
import {
  configurationsList,
  Configurations as ConfigurationsType,
} from '../../constants/SampleArrays';
import {useUpdateEffect} from '../../utils/hooks';

import styles from './style';

const Configurations = () => {
  const {colors, dark}: Theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);

  const [filteredConfigurations, setFilteredConfigurations] =
    useState(configurationsList);

  const handleSubmit = () => {
    setLoading(true);
    searchFilterFunction(searchValue);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const searchFilterFunction = (text: string) => {
    console.log('kia ha search query', text);

    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = configurationsList.filter(item => {
        const itemData = `
              ${item.name.toUpperCase()} 
              ${item.company_name.toUpperCase()} 
              ${item.model?.toUpperCase()} 
              ${item.serial?.toUpperCase()} 
              ${item.tag?.toUpperCase()}
            `;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredConfigurations(newData);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredConfigurations(configurationsList);
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
  listData?: ConfigurationsType[];
}) => {
  const {colors, dark}: Theme = useTheme();

  const renderList = ({
    item,
    index,
  }: {
    item: ConfigurationsType;
    index: number;
  }) => {
    return (
      <View style={styles.listContainer}>
        <Pressable
          onPress={() => console.log('Hello')}
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
        </Pressable>
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
