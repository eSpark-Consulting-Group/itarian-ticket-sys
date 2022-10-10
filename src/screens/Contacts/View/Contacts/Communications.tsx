import React, {useState} from 'react';
import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme, Theme, useRoute} from '@react-navigation/native';

import {RoundedIcon, SingleLineField} from '../../../../components';
import {contactsList} from '../../../../constants/SampleArrays';
import {ContactList} from '../../../../types';
import _ from 'lodash';

interface Item {
  headerTitle?: string;
  title: string | null | undefined;
  subTitle?: string;
  enable?: boolean;
  rightIcon?: string;
  titleWidth?: number;
  leftIcon?: string;
  searchable?: boolean;
  rightChild?: React.ReactNode;
  rightIconRound?: string;
  roundedIconEnable?: boolean;
  contacts?: ContactList[] | null | undefined;
}
export default function Communications() {
  const {colors}: Theme = useTheme();
  const routes: any = useRoute()
  const contactDetails = routes?.params?.contactDetails
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      subTitle: 'Email',
      rightChild: (
        <RoundedIcon
          enable={!_.isNull(contactDetails?.email)}
          onPress={() => Linking.openURL(`mailto:${contactDetails?.email}`)}
          icon="email-outline"
        />
      ),
      enable: false,
      title: contactDetails?.email || ''
      // contacts: contactsList[1].email_address,
    },
    {
      subTitle: 'Phone number',
      rightChild: (
        <RoundedIcon
          enable={!_.isNull(contactDetails.phone_number)}
          icon={'phone'}
          onPress={() => Linking.openURL(`tel:${contactDetails?.phone_number}`)}
        />
      ),
      enable: false,
      title: contactDetails.phone_number || 'N/A',
      // contacts: contactsList[1].phone_no,
    },
  ]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {dataSource?.map((value, key) => {
        if (value?.contacts?.length && value?.contacts?.length > 0) {
          return (
            <View key={key}>
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
            </View>
          );
        } else {
          return (
            <SingleLineField
              key={key}
              title={value?.title || ''}
              subTitle={value?.subTitle}
              rightChild={value?.rightChild}
              enable={value?.enable}
            />
          );
        }
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
