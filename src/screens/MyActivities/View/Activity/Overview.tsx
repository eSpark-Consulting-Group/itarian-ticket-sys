import React, {ReactNode, useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  useTheme,
  Theme,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import II from 'react-native-vector-icons/Ionicons';
import DatePicker from '@react-native-community/datetimepicker';

import {SingleLineField} from '../../../../components';
import {Activity, SelectFields} from '../../../../types';
import {
  companyNameList,
  contactNameList,
  resourceList,
  statusList,
  typeList,
  whereList,
} from '../../../../constants/SelectionList';

interface Item {
  title: string;
  subTitle: string;
  inputable?: boolean;
  enable?: boolean;
  rightIcon?: string;
  onChangeText?: (text: string) => void;
  mode?: 'none' | 'multiline';
  list?: SelectFields[];
  selectedItem?: SelectFields;
  rightChild?: ReactNode;
  searchable?: boolean;
  headerTitle?: string;
  gap?: boolean;
  onPress?: () => void;
}

type Mode = 'date' | 'time';
type PickerType = 'dd' | 'st' | 'et';

const Overview = () => {
  const {colors}: Theme = useTheme();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const item: Activity = route?.params?.data;
  const [showDate, setShowDate] = useState(false);
  const [mode, setMode] = useState<Mode>('date');
  const [pickerType, setpickerType] = useState<PickerType>('dd');
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: item?.summary,
      subTitle: 'Summary',
      inputable: true,
    },
    {
      title: item?.company_name,
      subTitle: 'Company',
      rightIcon: 'chevron-right',
      list: companyNameList,
      selectedItem: companyNameList[0],
      headerTitle: 'Companies',
    },
    {
      title: item?.date,
      subTitle: 'Due Date',
      rightChild: <MCI name="calendar" size={26} color={colors.primary} />,
      onPress: () => {
        setMode('date');
        setpickerType('dd');
        setShowDate(true);
      },
    },
    {
      title: item?.start_time ?? '--',
      subTitle: 'Start Time',
      rightChild: <II name="ios-stopwatch" size={26} color={colors.primary} />,
      onPress: () => {
        setMode('time');
        setpickerType('st');
        setShowDate(true);
      },
    },
    {
      title: item?.end_time ?? '--',
      subTitle: 'End Time',
      rightChild: <II name="ios-stopwatch" size={26} color={colors.primary} />,
      gap: false,
      onPress: () => {
        setMode('time');
        setpickerType('et');
        setShowDate(true);
      },
    },
    {
      title: 'Kyle Coney',
      subTitle: 'Contact',
      rightIcon: 'chevron-right',
      list: contactNameList,
      selectedItem: contactNameList[0],
      headerTitle: 'Contacts',
    },
    {
      title: 'Inquiry',
      subTitle: 'Type',
      rightIcon: 'chevron-right',
      list: typeList,
      selectedItem: typeList[0],
      headerTitle: 'Types',
    },
    {
      title: 'Remote',
      subTitle: 'Where',
      rightIcon: 'chevron-right',
      list: whereList,
      selectedItem: whereList[0],
      headerTitle: 'Where',
    },
    {
      title: 'Status',
      subTitle: 'Status',
      rightIcon: 'chevron-right',
      list: statusList,
      selectedItem: statusList[0],
      headerTitle: 'Status',
    },
    {
      title: 'Resource',
      subTitle: 'Resource',
      rightIcon: 'chevron-right',
      list: resourceList,
      selectedItem: resourceList[0],
      headerTitle: 'Resources',
    },
    {
      title: 'Visit potential prospect',
      subTitle: 'Notes',
      inputable: true,
      mode: 'multiline',
    },
  ]);

  useEffect(() => {
    if (route?.params?.item?.toString()) {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params]);

  const handlePress = (item: Item, index: number) => {
    if (item.list) {
      navigation.navigate('Stack2', {
        screen: 'CstmItemSelector',
        params: {
          from: 'Activities',
          item: index,
          data: item.list,
          selected: item.selectedItem,
          stack: 'Stack1',
          title: route?.params?.title,
          headerTitle: item.headerTitle,
          searchable: true,
        },
      });
    }
  };

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);
    let time = date.toString().substring(16, 21);

    if (event?.type == 'set') {
      switch (pickerType) {
        case 'dd':
          dataSource[2].title = date?.toDateString();
          setDataSource([...dataSource]);
          break;
        case 'st':
          dataSource[3].title = time;
          setDataSource([...dataSource]);
          break;
        case 'et':
          dataSource[4].title = time;
          setDataSource([...dataSource]);
        default:
          break;
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {showDate && (
        <DatePicker
          mode={mode}
          value={new Date()}
          minimumDate={new Date()}
          onChange={onChangeDate}
          positiveButtonLabel={
            pickerType == 'dd'
              ? 'Set Due Date'
              : pickerType == 'st'
              ? 'Confirm Start Time'
              : 'Confirm End Time'
          }
        />
      )}
      {dataSource.map((item: Item, index: number) => (
        <SingleLineField
          key={index}
          subTitle={item.subTitle}
          title={item.title}
          inputable={item.inputable}
          onChangeText={value => {}}
          enable={item.enable}
          rightIcon={item.rightIcon}
          rightChild={item.rightChild}
          mode={item.mode}
          onPress={
            item?.onPress ? item.onPress : () => handlePress(item, index)
          }
        />
      ))}
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
