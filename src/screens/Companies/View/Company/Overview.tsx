import React, {useState} from 'react';
import {StyleSheet, ScrollView, Linking} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useHookstate, State} from '@hookstate/core';

import {RoundedIcon, SingleLineField} from '../../../../components';
import {ContactList, SelectFields} from '../../../../types';
import {redirectToMap} from '../../../../utils/helperFunctions';
import {globalState} from '../../../../stores/globalAppState';
import {contactsList} from '../../../../constants/SampleArrays';

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

const Overview = () => {
  const dNavName: State<string> = useHookstate(
    globalState.defaultnNavigationName,
  );
  const [defaultNav, setdefaultNav] = useState(dNavName.get());
  const dataSource: Item[] = [
    {
      title: '(815)-555-1234',
      headerTitle: 'Company Phone No.',
      rightChild: (
        <RoundedIcon
          onPress={() => Linking.openURL(`tel:090078601`)}
          icon="phone"
        />
      ),
      enable: false,
    },
    {
      title: '645 Elm Street Tampa, Fl 32364',
      headerTitle: 'Company Address',
      rightChild: (
        <RoundedIcon
          icon="map-marker-outline"
          onPress={() => redirectToMap(34.923264, -120.429214, defaultNav)}
        />
      ),
      enable: false,
      titleWidth: moderateScale(130),
    },
    {
      title: 'Tim Smith',
      leftIcon: 'account',
      headerTitle: 'Company Address',
      enable: false,
    },
    {
      title: 'Emails',
      contacts: contactsList[1].email_address,
      rightChild: (
        <RoundedIcon
          onPress={() => Linking.openURL('mailto:support@example.com')}
          icon="email-outline"
        />
      ),
      enable: false,
    },
    {
      title: 'Phone numbers',
      rightChild: (
        <RoundedIcon
          onPress={() => Linking.openURL(`tel:090078601`)}
          icon="phone"
        />
      ),
      enable: false,
      contacts: contactsList[1].phone_no,
    },
  ];
  const [Ds, setDs] = useState<Item[]>(dataSource);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {Ds?.map((value, key) => {
        if (value?.contacts?.length && value?.contacts?.length > 0) {
          return (
            <>
              <SingleLineField title={value?.title || ''} enable={false} />
              {value?.contacts?.map((item, index) => (
                <SingleLineField
                  key={index}
                  title={item?.value}
                  subTitle={`${item?.type} ${
                    item?.isPrimary ? '(Primary)' : ''
                  }`}
                  rightChild={value?.rightChild}
                  enable={value?.enable}
                  leftIcon={value.leftIcon}
                  titleWidth={value?.titleWidth}
                  gap={false}
                />
              ))}
            </>
          );
        } else {
          return (
            <SingleLineField
              key={key}
              title={value?.title || ''}
              subTitle={value?.subTitle}
              rightChild={value?.rightChild}
              enable={value?.enable}
              titleWidth={value?.titleWidth}
              leftIcon={value.leftIcon}
            />
          );
        }
      })}
    </ScrollView>
  );
};

export default Overview;

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
