import React, {useState} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';

import {SearchBar, SimpleLoader} from '../../components';
import styles from './style';
import {Colors, Theme} from '../../theme/colors';
import {EmptyListMsg} from '../../components';
import {
  companiesList,
  Companines as CompanyType,
} from '../../constants/SampleArrays';
import {useUpdateEffect} from '../../utils/hooks';

const Companies = () => {
  const {colors, dark}: Theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);

  const [filteredCompanies, setFilteredCompanies] = useState(companiesList);

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
      const newData = companiesList.filter(item => {
        const itemData = `${item.name.toUpperCase()} ${item.id.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredCompanies(newData);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredCompanies(companiesList);
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
          placeholder={'Search Companies'}
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
        <RenderCompanies listData={filteredCompanies} />
      )}
    </View>
  );
};

export const RenderCompanies = ({
  listData = companiesList,
}: {
  listData?: CompanyType[];
}) => {
  const {colors, dark}: Theme = useTheme();

  const renderList = ({item, index}: {item: CompanyType; index: number}) => {
    return (
      <View style={styles.listContainer}>
        <Pressable
          onPress={() => console.log('Hello')}
          android_ripple={{color: dark ? '#ffffff0e' : '#0000000e'}}>
          <View style={{padding: moderateScale(15)}}>
            <Text
              style={{
                color: colors.text,
              }}>
              {item.name}
            </Text>
          </View>
        </Pressable>
        {index !== listData.length - 1 && (
          <Divider
            style={{backgroundColor: colors.text, ...styles.dividerStyle}}
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
      <EmptyListMsg label="Companies" />
    </View>
  );
};

export default Companies;
