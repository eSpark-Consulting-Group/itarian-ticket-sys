import {View, Text, TextInput, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GapView, ModalView, RoundedIcon, SingleLineField} from '../../components';
import {Theme, useTheme} from '@react-navigation/native';
import DatePicker from '@react-native-community/datetimepicker';

const NewExpenseReport = ({route} : any) => {
  const {colors, dark}: Theme = useTheme();
  const [showDate, setShowDate] = useState(false);

  const [dataSource, setDataSource] = useState<Item[]>([
  
    {title: 'Please Select', subTitle: 'Charge Code', rightIcon: 'chevron-right'},
    {
        title: 'Please Select', 
        subTitle: 'Jan 17, 2020', 
        rightIcon: 'calendar', 
        onPress: () => {
            setShowDate(true)
        }
    },
    {title: 'Please Select', subTitle: 'Expense Type', rightIcon: 'chevron-right'},
    {title: 'Amount', rightChild: <Text>0.00</Text>},
    {title: 'Paid by employee', subTitle: 'Payment Method', rightIcon: 'chevron-right'},
    {title: 'Please Select', subTitle: 'Images', 
    rightChild: 
    <View style={{flexDirection: 'row'}}>
      <View style={{marginHorizontal: 5}}>
        <RoundedIcon  icon='camera-outline'/>
      </View>
      <RoundedIcon icon='image-outline'/>

    </View>
    },
    {
      title: '',
      subTitle: 'Notes',
      inputable: true,
      enable: false,
      mode: 'multiline'
    },
  ]);

  interface Item {
    title: string;
    subTitle?: string;
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
    onPress?: () => void;
    rightChild?: React.ReactNode
  }

  type Mode = 'date' | 'time';
  type PickerType = 'dd' | 'st' | 'et';

  useEffect(() => {
    if(route?.params?.from) {
      let newData = [...dataSource];
      newData[9].title = "Johnny Bravo";
      setDataSource(newData);
    }
  }, [route?.params])
  
  const updateInput = (e: string, index: number) => {
    console.log('Text Index', e, index);
    let newData = [...dataSource];
    newData[index].title = e;
    console.log('New Data', newData);
    setDataSource(newData);
  };

  const onChangeDate = (event: any, date: any) => {
    setShowDate(false);

    if(event?.type == 'set') {
        dataSource[1].title = date?.toDateString()
        setDataSource([...dataSource])
    }
   
  }

  return (
    <ModalView bgColor={colors.card}>
        {showDate && (
        <DatePicker
          mode={"date"}
          value={new Date()}
          onChange={onChangeDate}
        />
      )}
      <ScrollView style={{flex: 1}}>
        <View style={{backgroundColor: colors.background}}>
          {dataSource.map((item, index) => (
            <SingleLineField
              key={index}
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
              onChangeSwitch={item.onChangeSwitch}
              mode={item?.mode}
              onPress={item?.onPress}
              rightChild={item?.rightChild}
            />
          ))}
          {/* <GapView /> */}
        </View>
      </ScrollView>
    </ModalView>
  );
};

export default NewExpenseReport;
