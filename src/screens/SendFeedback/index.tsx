import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Keyboard,
  ScrollView,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import {
  CstmPressable,
  FloatButton,
  GapView,
  Loader,
  NotFound,
} from '../../components';
import {getPosts} from './utils';
import {CannyPosts} from '../../types';

const SendFeedbackScreen = () => {
  const {dark, colors} = useTheme();
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(false);
  const [postsData, setPostsData] = useState<any>([]);

  useEffect(() => {
    // call the function
    fetchPosts();
  }, []);

  const fetchPosts = (req?: CannyPosts) => {
    setLoading(true);
    console.log(req);
    getPosts()
      .then(res => {
        if (res.ok) {
          const {posts}: any = res?.data;
          console.log('data', posts);
          handlePosts(posts);
        }
      })
      // make sure to catch any error
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const handlePosts = (data: any[]) => {
    setPostsData(data);
    setLoading(false);
  };

  const renderList = (item: any, index: number) => {
    return (
      <CstmPressable
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          padding: 20,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: colors.primary,
          elevation: 2,
          backgroundColor: colors.background,
        }}
        onPress={() =>
          navigation.navigate('Stack1', {screen: 'Post', params: {id: item.id}})
        }>
        <View style={{flex: 0.2}}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: colors.primary,
            }}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: colors.primary}}>
              {item.author.name.substring(0, 1).toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={{flex: 0.6}}>
          <Text style={{color: colors.text}} numberOfLines={2}>
            {item.details}
          </Text>
          <Text style={{color: colors.text, fontWeight: 'bold'}}>
            Status: {item.status}
          </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 6,
              paddingHorizontal: 4,
              borderColor: colors.primary,
              elevation: 1,
              backgroundColor: colors.background,
            }}>
            <MCI
              name="arrow-up-thick"
              color={colors.text}
              style={{alignSelf: 'center', margin: 2}}
            />
            <Text style={{textAlignVertical: 'center', color: colors.text}}>
              99
            </Text>
          </View>
          <GapView mode="horizontal" />
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              paddingHorizontal: 4,
              borderRadius: 6,
              borderColor: colors.primary,
              elevation: 1,
              backgroundColor: colors.background,
            }}>
            <MCI
              name="chat"
              color={colors.text}
              style={{alignSelf: 'center', margin: 2}}
            />
            <Text style={{textAlignVertical: 'center', color: colors.text}}>
              99
            </Text>
          </View>
        </View>
      </CstmPressable>
    );
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 15, paddingTop: 15}}>
      <Loader isShow={loading} />
      <FlatList
        data={postsData}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => fetchPosts()} />
        }
        contentContainerStyle={{flex: postsData.length > 0 ? 0 : 1}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NotFound label="Posts Found" />}
        renderItem={({item, index}) => renderList(item, index)}
      />
      <FloatButton
        onPress={() => navigation.navigate('Stack1', {screen: 'CreatePost'})}
      />
    </View>
  );
};

export default SendFeedbackScreen;
