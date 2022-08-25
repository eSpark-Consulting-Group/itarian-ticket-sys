import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';
import {Divider} from 'react-native-paper';

import {SearchBar, SimpleLoader} from '../../components';
import styles from './style';
import {Theme} from '../../theme/colors';
import {EmptyListMsg, CstmSwitchSelector} from '../../components';
import {contactsList} from '../../constants/SampleArrays';
import {Contact} from '../../types';
import {useUpdateEffect} from '../../utils/hooks';

const InOutBoardScreen = () => {
  const {colors, dark}: Theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [selection, setSelection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [clear, setClear] = useState(false);

  const [members, setMembers] = useState<Contact[]>();

  const handleSubmit = () => {
    setIsLoading(true);
    searchFilterFunction(searchValue);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const searchFilterFunction = (text: string) => {
    console.log('kia ha search query', text);

    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      // console.log('aya filtered memebers', members);
        const newData = contactsList?.filter(item => {
        const itemData = `${item.name.toUpperCase()} ${item.company_name.toUpperCase()}`;
        const textData = text.toUpperCase();
        if(selection == 1) {
          return (itemData.indexOf(textData) > -1 && item.inOffice);
        }else {
          return (itemData.indexOf(textData) > -1 && !item.inOffice);
        }
      });
      setMembers(newData);
    } else {
      let membersList = [...contactsList].filter(item => item.inOffice);
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setMembers(membersList);
    }
  };

  const handleSwitch = () => {
    if (selection == 1) {
      let news = [...contactsList].filter(item => !item.inOffice);
      setMembers(news);
      setSelection(2);
    } else if (selection == 2) {
      let news = [...contactsList].filter(item => item.inOffice);
      setMembers(news);
      setSelection(1);
    } else {
      return;
    }
  };

  const handleClear = () => {
    setSearchValue('');
    setClear(true);
  };

  useUpdateEffect(() => {
    if (clear) {
      console.log('done');
      handleSwitch();
      setClear(false);
    }
  }, [clear]);

  useEffect(() => {
    let membersList = [...contactsList].filter(item => item.inOffice);
    setMembers(membersList);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log('Current Selection', selection);
  }, [selection]);

  const renderList = ({item, index}: {item: Contact; index: number}) => {
    return (
      <View style={styles.listContainer}>
        <View style={{padding: moderateScale(15)}}>
          <Text
            style={{
              color: colors.text,
              fontWeight: selection == 2 ? "bold" : "normal"
            }}>
            {item.name}
          </Text>
         {selection == 2 && <>
          <Text
            style={{
              color: colors.text,
            }}>
             Gone To: {item.goneTo}
          </Text>
          <Text
            style={{
              color: colors.text,
            }}>
            Back Date: {item.backDate}
          </Text>
          <Text
            style={{
              color: colors.text,
            }}>
            Back Time: {item.backTime}
          </Text>
          </>}
        </View>
        {index !== contactsList.length - 1 && (
          <Divider
            style={{backgroundColor: colors.text, ...styles.dividerStyle}}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.header,
        }}>
        <SearchBar
          withTag={false}
          placeholder={'Search Members...'}
          fontSize={'large'}
          value={searchValue}
          setChangeText={value => setSearchValue(value)}
          onSubmit={handleSubmit}
          onClear={handleClear}
        />
      </View>
      <View
        style={{
          borderColor: '#ffffff80',
          backgroundColor: dark ? '#000000' : '#ffffff',
          ...styles.subHeader,
        }}>
        <View style={styles.switchContainer}>
          <CstmSwitchSelector
            selectionMode={selection}
            roundCorner={true}
            option1={'In'}
            option2={'Out'}
            onSelectSwitch={handleSwitch}
            selectionColor={colors.primary}
          />
        </View>
      </View>
      {isLoading ? (
        <SimpleLoader />
      ) : members?.length !== 0 ? (
        <FlatList data={members} renderItem={renderList} />
      ) : (
        <NotFound />
      )}
    </View>
  );
};

const NotFound = (): JSX.Element => {
  return (
    <View style={styles.content}>
      <EmptyListMsg label="Members" />
    </View>
  );
};

export default InOutBoardScreen;
