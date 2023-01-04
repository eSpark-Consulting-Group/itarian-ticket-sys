import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  KeyboardTypeOptions,
  Alert,
} from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import {FloatButton, GapView, Loader, SingleLineField} from '../../../../components';
import {SelectFields} from '../../../../types';
import {SelectItems} from '../../../../utils/helperFunctions';
import { deletePriorities } from '../../utils/functions';

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
  list?: SelectFields[];
  selectedItem?: SelectFields;
  searchable?: boolean;
  headerTitle?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  isRequired?: boolean;
  mode?: 'none' | 'multiline';
  onPress?: () => void;
}

export default function Details() {
  const {colors, dark}: Theme = useTheme();
  const routes: any = useRoute();
  const navigation: any = useNavigation();
  const ticketPriorityDetails = routes?.params?.ticketPriorityDetails;
  const [loader, setLoader] = useState(false)
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: "Status",
      enable: true,
      rightSwitchVal: Boolean(ticketPriorityDetails?.attributes?.status),
      showRightSwitch: true,
    },
    {
      title: "IsPublic",
      enable: true,
      rightSwitchVal: Boolean(ticketPriorityDetails?.attributes?.is_public),
      showRightSwitch: true,
    },
    {
      subTitle: 'name',
      title: ticketPriorityDetails?.attributes?.name ?? '',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      title: ticketPriorityDetails?.attributes?.color ?? '',
      subTitle: 'color',
      inputable: false,
      enable: false,
      isRequired: false,
    },
    {
      title: ticketPriorityDetails?.attributes?.description ?? '',
      subTitle: 'description',
      inputable: true,
      enable: false,
      isRequired: true,
      mode: 'multiline',
    },
  ]);
  const updateInput = (e: string, index: number) => {
    let newData = [...dataSource];
    newData[index].title = e;
    setDataSource(newData);
  };

  const updateSwitch = (index: number) => {
    let tempArr: Item[] = [...dataSource];
    tempArr[index].rightSwitchVal = !tempArr[index].rightSwitchVal;
    setDataSource(tempArr);
  };

  const renderList = ({item, index}: {item: Item; index: number}) => {
    return (
      <SingleLineField
        key={index}
        subTitle={item.isRequired ? item.subTitle + '*' : item.subTitle}
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
        keyboardType={item?.keyboardType}
        mode={item?.mode}
        onPress={() =>
          SelectItems(item, index, navigation, routes, 'TeamDetails', 'Stack1')
        }
      />
    );
  };

  const deleteFunc = (id: number) => {
    setLoader(true)
    deletePriorities(id)
    .then(res => {
      setLoader(false)
      if(res?.status) {
        navigation?.goBack()
      }
    })
    .catch((err) => {
      console.log("delete teams failed", err)
      setLoader(false)
    })
  
  }

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (routes?.params?.item?.toString() && routes?.params?.item != 'GoneTo') {
      var obj: any = [...dataSource];
      obj[routes?.params?.item].title = routes?.params?.selected?.name;
      obj[routes?.params?.item].selectedItem = routes?.params?.selected;
      setDataSource([...obj]);
    }
  }, [routes?.params?.selected]);

  useEffect(() => {
    const Data: Item[] = [];
    dataSource.map(item =>
      Data.push({
        title: item.title,
        subTitle: item.subTitle,
        isRequired: item.isRequired,
        selectedItem: item.selectedItem,
        rightSwitchVal: item.rightSwitchVal
      }),
    );
    Data[Data?.length] = {
      title: ticketPriorityDetails?.id,
      subTitle: "id",
    }
    navigation?.setParams({
      ...routes?.params,
      data: Data,
    });
  }, [dataSource]);

  return (
    <View style={{flex: 1}}>
      <Loader isShow={loader} />
      <GapView />
      <FlatList
        data={dataSource}
        renderItem={renderList}
        ItemSeparatorComponent={() => (
          <Divider style={{backgroundColor: colors.background, height: 1.5}} />
        )}
      />
      {dataSource[1].title != "Default" &&
      <FloatButton icon='delete' onPress={() => {
          Alert.alert(
            'Delete Sla Plan?',
            'Are you sure you want to delete this Sla Plan permanently?',
            [
              {
                text: 'Yes',
                style: 'default',
                onPress: () => deleteFunc(ticketPriorityDetails?.id),
              },
              {
                text: 'No',
                style: 'cancel',
                onPress: () => console.log('Pressed Cancel on Delete'),
              },
            ],
          );
      }}/> }
    </View>
  );
}
