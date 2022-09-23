import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import DatePicker from '@react-native-community/datetimepicker';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {ModalView, SingleLineField} from '../../components';
import {SelectFields} from '../../types';
import {
  companyNameList,
  contactNameList,
  manufacturerNameList,
  statusList,
  typeList,
  vendorNameList,
} from '../../constants/SelectionList';

interface Item {
  title: string;
  subTitle: string;
  inputable?: boolean;
  enable?: boolean;
  rightIcon?: string;
  rightIconRound?: string;
  titleWidth?: number;
  showRightSwitch?: boolean;
  rightSwitchVal?: boolean;
  onChangeSwitch?: (value: boolean) => void;
  onChangeText?: (text: string) => void;
  mode?: 'none' | 'multiline';
  list?: SelectFields[];
  selectedItem?: SelectFields;
  searchable?: boolean;
  headerTitle?: string;
  onPress?: () => void;
  rightChild?: React.ReactNode;
}

type PickerType = 'PD' | 'ED' | 'ID';

const NewConfiguration = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const [billCustomer, setBillCustomer] = useState(false);
  const [needsRenewal, setNeedsRenewal] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [pickerType, setpickerType] = useState<PickerType>('PD');
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: '',
      subTitle: 'Configuration Name',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'Company',
      title: 'Please Select',
      rightIcon: 'chevron-right',
      list: companyNameList,
      selectedItem: companyNameList[0],
      headerTitle: 'Company Name',
      searchable: true,
    },
    {
      subTitle: 'Type',
      title: 'Please Select',
      rightIcon: 'chevron-right',
      list: typeList,
      selectedItem: typeList[0],
      headerTitle: 'Type',
    },
    {
      subTitle: 'Status',
      title: 'Please Select',
      rightIcon: 'chevron-right',
      list: statusList,
      selectedItem: statusList[0],
      headerTitle: 'Status',
    },
    {
      subTitle: 'Manufacturer',
      title: 'Please Select',
      rightIcon: 'chevron-right',
      list: manufacturerNameList,
      selectedItem: manufacturerNameList[0],
      headerTitle: 'Manufacturer',
    },
    {
      title: '',
      subTitle: 'Mfg Part Number',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Model Number',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Serial Number',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      subTitle: 'Tag Number',
      inputable: true,
      enable: false,
    },
    {
      subTitle: 'Vendor',
      title: 'Please Select',
      rightIcon: 'chevron-right',
      list: vendorNameList,
      selectedItem: vendorNameList[0],
      headerTitle: 'Vendor',
    },
    {
      subTitle: 'Purchase Date',
      title: '20-05-2022',
      rightChild: <MCI name="calendar" size={26} color={colors.primary} />,
      onPress: () => {
        setpickerType('PD');
        setShowDate(true);
      },
    },
    {
      subTitle: 'Expiration Date',
      title: '25-11-2022',
      rightChild: <MCI name="calendar" size={26} color={colors.primary} />,
      onPress: () => {
        setpickerType('ED');
        setShowDate(true);
      },
    },
    {
      subTitle: 'Install Date',
      title: '04-10-2022',
      rightChild: <MCI name="calendar" size={26} color={colors.primary} />,
      onPress: () => {
        setpickerType('ID');
        setShowDate(true);
      },
    },
    {
      subTitle: 'Installed By',
      title: 'Kents Works',
      rightIcon: 'chevron-right',
      list: contactNameList,
      selectedItem: contactNameList[0],
      headerTitle: 'Installed By',
    },
    {
      subTitle: 'Bill Customer',
      title: `Current State: ${billCustomer ? 'Yes' : 'No'}`,
      showRightSwitch: true,
      enable: false,
      rightSwitchVal: billCustomer,
      onChangeSwitch: value => {
        setBillCustomer(value);
      },
    },
    {
      subTitle: 'Needs Renewal',
      title: 'Tap to toggle on or off',
      showRightSwitch: true,
      enable: false,
      rightSwitchVal: needsRenewal,
      onChangeSwitch: value => {
        setNeedsRenewal(value);
      },
    },
    {
      subTitle: 'Notes',
      title: 'Tap to View Notes',
      rightIcon: 'chevron-right',
    },
    {
      subTitle: 'Vendor Notes',
      title: 'Tap to View Vendor Notes',
      rightIcon: 'chevron-right',
    },
    {
      title: '',
      mode: 'multiline',
      subTitle: 'Notes',
      inputable: true,
      enable: false,
    },
    {
      title: '',
      mode: 'multiline',
      subTitle: 'Vendor Notes',
      inputable: true,
      enable: false,
    },
  ]);

  const updateInput = (e: string, index: number) => {
    console.log('Text Index', e, index);
    let newData = [...dataSource];
    newData[index].title = e;
    console.log('New Data', newData);
    setDataSource(newData);
  };

  const updateSwitch = (index: number) => {
    let newData = [...dataSource];
    newData[index].rightSwitchVal = !newData[index].rightSwitchVal;
    console.log('New Data', newData[index]);
    setDataSource(newData);
  };

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  console.log('route?.params?.item', route);
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...dataSource];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setDataSource([...obj]);
    }
  }, [route?.params]);

  const handlePress = (item: Item, index: number) => {
    if (item?.list) {
      navigation.navigate('Stack2', {
        screen: 'CstmItemSelector',
        params: {
          ...route?.params,
          from: 'NewConfigure',
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
      switch (pickerType) {
        case 'PD':
          dataSource[10].title = date?.toDateString();
          setDataSource([...dataSource]);
          break;
        case 'ED':
          dataSource[11].title = date?.toDateString();
          setDataSource([...dataSource]);
          break;
        case 'ID':
          dataSource[12].title = date?.toDateString();
          setDataSource([...dataSource]);
        default:
          break;
      }
    }
  };

  return (
    <ModalView bgColor={colors.card}>
      {showDate && (
        <DatePicker
          mode={'date'}
          value={new Date()}
          minimumDate={new Date()}
          onChange={onChangeDate}
        />
      )}
      <ScrollView style={{flex: 1}}>
        <View style={{backgroundColor: colors.background}}>
          {dataSource.map((item, index) => (
            <SingleLineField
              key={index}
              mode={item.mode}
              subTitle={item.subTitle}
              title={item.title}
              inputable={item.inputable}
              onChangeText={e => updateInput(e, index)}
              enable={item.enable}
              rightIconRound={item.rightIconRound}
              titleWidth={item.titleWidth}
              rightIcon={item.rightIcon}
              showRightSwitch={item.showRightSwitch}
              rightSwitchVal={item.rightSwitchVal}
              onChangeSwitch={() => updateSwitch(index)}
              onPress={
                item?.onPress ? item?.onPress : () => handlePress(item, index)
              }
              rightChild={item?.rightChild}
            />
          ))}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewConfiguration;
