import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {useTheme, Theme} from '@react-navigation/native';
import {AvatarContainer, FloatButton, SingleLineField} from '../../components';

import {State, useHookstate} from '@hookstate/core';
import Images from '../../assets/Images';
import {userStore} from '../../stores/userStore';
import {filterUser, updateUser} from './utils';
import {FlatList} from 'react-native-gesture-handler';
import {SelectFields} from '../../types';
import {dataFormatter, SelectItems} from '../../utils/helperFunctions';
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
  inputable?: boolean;
  list?: SelectFields[];
  selectedItem?: SelectFields;
}

const Profile = ({route, navigation}: any) => {
  const {colors, dark}: Theme = useTheme();
  const currStatus: State<boolean> = useHookstate(userStore.currentStatus);
  const user: State<any> = useHookstate(userStore.user);
  const [userObj, setUserObj] = useState<any>(null);
  const [userData, setUserData] = useState<Item[]>([
    {
      title: '',
      subTitle: 'first Name',
      inputable: true,
    },
    {
      subTitle: 'last name',
      title: '',
      inputable: true,
    },
    {
      subTitle: 'country code',
      title: '',
      inputable: true,
    },
    {
      subTitle: 'ext',
      title: '',
      inputable: true,
    },
    {
      subTitle: 'phone_number',
      title: '',
      inputable: true,
    },
    {
      subTitle: 'mobile_number',
      title: '',
      inputable: true,
    },
  ]);

  useEffect(() => {
    filterUser(`filter[email][]=${user?.get()?.email}`).then(res => {
      const dataSource: Item[] = [...userData];
      dataSource[0].title = res?.attributes?.first_name?.toString();
      dataSource[1].title = res?.attributes?.last_name?.toString();
      dataSource[2].title = res?.attributes?.country_code?.toString();
      dataSource[3].title = res?.attributes?.ext?.toString();
      dataSource[4].title = res?.attributes?.phone_number?.toString();
      dataSource[5].title = res?.attributes?.mobile_number?.toString();
      setUserObj(res);
      setUserData(dataSource);
    });
  }, [user]);

  // FUNTIONS FOR SELECTING ITEM DATA_SOURCE
  useEffect(() => {
    if (route?.params?.item?.toString() && route?.params?.item != 'GoneTo') {
      var obj: any = [...userData];
      obj[route?.params?.item].title = route?.params?.selected?.name;
      obj[route?.params?.item].selectedItem = route?.params?.selected;
      setUserData([...obj]);
    }
  }, [route?.params?.selected]);

  const updateInput = (e: string, index: number) => {
    let newData = [...userData];
    newData[index].title = e;
    setUserData(newData);
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}>
      <View
        style={{
          ...styles.infoHolder,
          backgroundColor: dark ? '#0000008a' : '#ffffff8a',
        }}>
        <AvatarContainer source={Images.Avatar} />
        <Text style={{fontWeight: 'bold', color: colors.text}}>
          {user.get()?.email ?? 'N/A'}
        </Text>
      </View>
      <FlatList
        data={userData || []}
        renderItem={({item: user, index}: {item: Item; index: number}) => {
          return (
            <SingleLineField
              key={index}
              subTitle={user?.subTitle}
              title={user?.title ?? ''}
              inputable={user?.inputable}
              onChangeText={e => updateInput(e, index)}
            />
          );
        }}
      />
      <FloatButton
        icon="content-save-outline"
        onPress={() => {
          const data = dataFormatter(userData, '_');
          const dataObj = {
            data: {
              id: userObj?.id,
              type: 'users',
              attributes: {
                provider_id: null,
                email: user.get()?.email ?? '',
                user_name: userObj?.attributes?.user_name,
                last_name: data?.last_name,
                first_name: data?.first_name,
                company: userObj?.attributes?.user_name,
                is_active: userObj?.attributes?.is_active,
                ext: data?.ext,
                country_code: Number(data?.country_code ?? 0),
                phone_number: data?.phone_number,
                mobile_number: data?.mobile_number,
                internal_note: userObj?.attributes?.internal_note,
              },
            },
          };

          console.log('dataObj', dataObj);

          updateUser(userObj?.id, dataObj);
        }}
      />
    </View>
  );
};

export default Profile;
