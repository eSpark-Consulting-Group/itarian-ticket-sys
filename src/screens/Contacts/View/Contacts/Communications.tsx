import React, {useState} from 'react';
import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme, Theme} from '@react-navigation/native';
import {RoundedIcon, SingleLineField} from '../../../../components';
import {contactsList} from '../../../../constants/SampleArrays';
import {ContactList} from '../../../../types';
import {FlatList} from 'react-native-gesture-handler';

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
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: 'Emails',
      rightChild: (
        <RoundedIcon
          onPress={() => Linking.openURL('mailto:support@example.com')}
          icon="email-outline"
        />
      ),
      enable: false,
      contacts: contactsList[1].email_address,
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
  ]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {dataSource?.map((value, key) => {
        if (value?.contacts?.length && value?.contacts?.length > 0) {
          return (
            <>
              <SingleLineField title={value?.title || ''} enable={false}/>
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
