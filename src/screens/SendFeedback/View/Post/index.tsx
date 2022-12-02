import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {useRoute, useTheme} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {getPostbyId as getPostDetails} from '../../utils';
import {CstmPressable, GapView, Loader} from '../../../../components';
import {WINDOW_WIDTH} from '../../../../constants';

export default function Post() {
  const {colors, dark} = useTheme();
  const route: any = useRoute();
  const [loading, setLoading] = useState(false);
  const [postDetail, setPostDetail] = useState<any>({});

  useEffect(() => {
    const {id} = route?.params;
    console.log(id);
    fetchPostDetail(id);
  }, [route?.params]);

  const fetchPostDetail = (id: string) => {
    // call the function
    setLoading(true);
    getPostDetails({id})
      .then(res => {
        if (res.ok) {
          console.log('data', res?.data);
          handlePostDetails(res?.data);
        }
      })
      // make sure to catch any error
      .catch(console.error);
  };

  const handlePostDetails = (data: any) => {
    console.log('byID==>>', data);
    setPostDetail(data);
    setLoading(false);
  };

  const renderImageList = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={{flexDirection: 'row', backgroundColor: colors.card}}>
        <Image
          source={{uri: item}}
          style={{
            flex: 1,
            width: 100,
            height: 100,
          }}
          resizeMode="contain"
        />
        <GapView mode="horizontal" length={5} />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Loader isShow={loading} />
      <View style={{paddingTop: 10}}>
        <View
          style={{
            padding: 15,
            backgroundColor: colors.card,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
                height: 30,
                borderRadius: 30,
              }}>
              <Text style={{color: colors.text, fontWeight: 'bold'}}>J</Text>
            </View>
            <GapView mode="horizontal" length={5} />
            <Text style={{color: colors.text}}>John Doe</Text>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 5,
                backgroundColor: 'grey',
                alignSelf: 'center',
                margin: 4,
                marginTop: 8,
              }}
            />
            <Text style={{color: colors.text}}>3 hours ago</Text>
          </View>
          <Text style={{color: colors.text, fontSize: 24}}>
            {postDetail?.title}
          </Text>
          <GapView mode="vertical" />
          <Text style={{color: colors.text, opacity: 0.7}}>
            {postDetail?.details}
          </Text>
          <FlatList data={postDetail?.imageURLs} renderItem={renderImageList} />
          <GapView mode="vertical" length={15} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <CstmPressable
                style={{flexDirection: 'row'}}
                android_ripple={{borderless: true}}>
                <MCI
                  name="chat"
                  // color={colors.background}
                  size={20}
                  style={{alignSelf: 'center', margin: 2}}
                />
                <Text
                  style={{
                    fontSize: 16,
                    textAlignVertical: 'center',
                    fontWeight: 'bold',
                  }}>
                  12
                </Text>
              </CstmPressable>
              <GapView mode="horizontal" length={20} />
              <CstmPressable
                style={{flexDirection: 'row'}}
                android_ripple={{borderless: true}}>
                <MCI
                  name="arrow-up-thick"
                  // color={colors.background}
                  size={22}
                  style={{alignSelf: 'center', margin: 2}}
                />
                <Text
                  style={{
                    fontSize: 16,
                    textAlignVertical: 'center',
                    fontWeight: 'bold',
                  }}>
                  12
                </Text>
              </CstmPressable>
            </View>
            <CstmPressable android_ripple={{borderless: true}}>
              <MCI
                name="dots-horizontal"
                // color={colors.background}
                size={22}
                style={{alignSelf: 'center', margin: 2}}
              />
            </CstmPressable>
          </View>
        </View>
        <GapView mode="vertical" />
        <View
          style={{
            padding: 15,
            backgroundColor: colors.card,
          }}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
