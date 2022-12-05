import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardTypeOptions,
} from 'react-native';
import {
  useTheme,
  Theme,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import {CstmButton, GapView, SingleLineField} from '../../../../components';
import {SelectFields} from '../../../../types';
import {userStore} from '../../../../stores/userStore';
import {State, useHookstate} from '@hookstate/core';
import {SelectItems} from '../../../../utils/helperFunctions';
import { SCREEN_WIDTH } from '../../../../constants';
import { deleteTeams } from '../../utils/functions';

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
  const teamDetails = routes?.params?.teamDetails;
  const users: State<any> = useHookstate(userStore.users);
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: "Status",
      enable: true,
      rightSwitchVal: teamDetails?.attributes?.status,
      showRightSwitch: true,
    },
    {
      subTitle: 'Team Name',
      title: teamDetails?.attributes?.name ?? '',
      inputable: true,
      enable: false,
      isRequired: true,
    },
    {
      title: teamDetails?.attributes?.teamlead?.user_name ?? 'Please Select',
      subTitle: 'Team Lead',
      list: users.get() || [],
      selectedItem: users
        .get()
        ?.filter(
          (value: any) => value?.id == teamDetails?.attributes?.teamlead?.id,
        ),
      headerTitle: 'Member',
      rightIcon: 'chevron-right',
      isRequired: true,
    },
    {
      title: teamDetails?.attributes?.admin_notes ?? '',
      subTitle: 'Admin Notes',
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
          SelectItems(item, index, navigation, routes, 'NewTeam', 'Stack1')
        }
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <GapView />
      <FlatList
        data={dataSource}
        renderItem={renderList}
        ItemSeparatorComponent={() => (
          <Divider style={{backgroundColor: colors.background, height: 1.5}} />
        )}
      />
      <View style={{position: 'absolute', bottom: 0, width: SCREEN_WIDTH}}>
        <CstmButton title='Delete' onPress={() => {
          deleteTeams(teamDetails?.id)
          .then(res => {
            console.log("attributes", res);
            if(res?.status) {
              navigation?.goBack()
            }
          })
        }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
