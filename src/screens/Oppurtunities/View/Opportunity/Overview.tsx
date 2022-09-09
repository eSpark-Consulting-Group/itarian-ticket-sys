import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {SingleLineField} from '../../../../components/index';
import {
  priorityList,
  probabilityList,
  ratingList,
  salesRepList,
  siteList,
  stageList,
  statusList,
  typeList,
} from '../../../../constants/SelectionList';
import {SelectFields} from '../../../../types';
import DatePicker from '@react-native-community/datetimepicker';

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
  onPress?: () => void;
  inputable?: boolean;
}

export default function Overview() {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [showDate, setShowDate] = useState(false);
  const [Ds, setDs] = useState<Item[]>([
    {
      title: 'Steven Howard',
      leftIcon: 'account',
      rightIcon: 'chevron-right',
    },
    {
      title: '3 Years Premium Service Contract',
      subTitle: 'Opportunity',
      inputable: true,
      enable: false,
    },
    {
      title: siteList[0].name,
      subTitle: 'Site',
      rightIcon: 'chevron-right',
      headerTitle: 'Site',
      list: siteList,
      selectedItem: siteList[0],
      searchable: false,
    },
    {
      title: '31 Dec 2022',
      subTitle: 'Close Date',
      leftIcon: 'calendar',
      enable: true,
      onPress: () => {
        setShowDate(true);
      },
    },
    {
      title: priorityList[0].name,
      subTitle: 'Priority',
      rightIcon: 'chevron-right',
      headerTitle: 'Priority',
      list: priorityList,
      selectedItem: priorityList[0],
      searchable: false,
    },
    {
      title: statusList[0].name,
      subTitle: 'Status',
      rightIcon: 'chevron-right',
      headerTitle: 'Status',
      list: statusList,
      selectedItem: statusList[0],
      searchable: false,
    },
    {
      title: stageList[0].name,
      subTitle: 'Stage',
      rightIcon: 'chevron-right',
      headerTitle: 'Stage',
      list: stageList,
      selectedItem: stageList[0],
      searchable: false,
    },
    {
      title: probabilityList[0].name,
      subTitle: 'Probability',
      rightIcon: 'chevron-right',
      headerTitle: 'Probability',
      list: probabilityList,
      selectedItem: probabilityList[0],
      searchable: false,
    },
    {
      title: ratingList[0].name,
      subTitle: 'Rating',
      rightIcon: 'chevron-right',
      headerTitle: 'Rating',
      list: ratingList,
      selectedItem: ratingList[0],
      searchable: false,
    },
    {
      title: typeList[0].name,
      subTitle: 'Type',
      rightIcon: 'chevron-right',
      headerTitle: 'Type',
      list: typeList,
      selectedItem: typeList[0],
      searchable: false,
    },
    {
      title: salesRepList[0].name,
      subTitle: 'Sales Rep',
      rightIcon: 'chevron-right',
      headerTitle: 'Sales Rep',
      list: salesRepList,
      selectedItem: salesRepList[0],
      searchable: false,
    },
  ]);

  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...Ds];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDs([...obj]);
    }
  }, [route?.params]);

  const handlePress = (item: Item, index: number) => {
    if (item?.list) {
      navigation.navigate('Stack2', {
        screen: 'CstmItemSelector',
        params: {
          from: 'Opportunity',
          item: index,
          data: item.list,
          selected: item.selectedItem,
          stack: 'Stack1',
          title: route?.params?.title,
          headerTitle: item.headerTitle,
          searchable: item.searchable,
        },
      });
    }
  };

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    let time = date.toString().substring(16, 21);

    if (event?.type == 'set') {
      Ds[3].title = date?.toDateString();
      setDs([...Ds]);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {showDate && (
        <DatePicker
          mode={'date'}
          value={new Date()}
          minimumDate={new Date()}
          onChange={onChangeDate}
        />
      )}

      {Ds.map((item, index) => (
        <SingleLineField
          key={index}
          subTitle={item.subTitle}
          inputable={item.inputable}
          title={item.title}
          enable={item.enable}
          rightIcon={item.rightIcon}
          leftIcon={item.leftIcon}
          onPress={
            item?.onPress ? item.onPress : () => handlePress(item, index)
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
