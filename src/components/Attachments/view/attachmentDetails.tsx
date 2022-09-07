import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {SingleLineField} from '../../FormFields';
import ModalView from '../../ModalView';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {fileIcons} from '../../../constants/';
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
  rightChild?: React.ReactNode;
  headerTitle?: string;
}

export const AttachmentDetails = ({navigation, route}: any) => {
  const [dataSource, setDataSource] = useState<Item[]>([
    {
      title: route?.params?.file?.name,
      subTitle: 'File Name',
    },
    {
      subTitle: 'Description',
      title: '',
      inputable: true,
      mode: 'multiline',
    },
  ]);

  const updateInput = (text: any, index: number) => {
    let newData = [...dataSource];
    newData[index].title = text;
    navigation.setParams({
      ...route?.params,
      file: {...route?.params?.file, description: text},
    });
    setDataSource(newData);
  };
  const fileExt = route?.params?.file?.name?.split('.').pop();
  return (
    <ModalView>
      {route?.params?.file?.type != 'file' ? (
        <Image
          source={{uri: route?.params?.file?.path}}
          style={{
            height: 300,
            width: 300,
            alignSelf: 'center',
            margin: 20,
          }}
        />
      ) : (
        <MCI
          name={fileIcons[fileExt].icon}
          color={fileIcons[fileExt].color}
          size={300}
          style={{alignSelf: 'center'}}
        />
      )}
      {dataSource?.map((value, index) => (
        <SingleLineField
          key={index}
          subTitle={value.subTitle}
          title={value.title}
          inputable={value.inputable}
          onChangeText={e => updateInput(e, index)}
          mode={value.mode}
        />
      ))}
    </ModalView>
  );
};
