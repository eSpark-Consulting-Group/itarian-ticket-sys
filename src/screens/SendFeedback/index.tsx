import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {useHookstate, State} from '@hookstate/core';
import moment from 'moment';

import {userStore} from '../../stores/userStore';
import {User} from '../../types';
import {
  CstmPressable,
  FloatButton,
  GapView,
  Loader,
  NotFound,
} from '../../components';
import {getPosts, getUserByUserId} from './utils';
import {CannyPosts} from '../../types';
import {SCREEN_HEIGHT} from '../../constants';

const SendFeedbackScreen = () => {
  const {dark, colors} = useTheme();
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(false);
  const [postsData, setPostsData] = useState<any>([]);
  const [limit, setLimit] = useState<number>(10);
  const [itemsLoader, setItemsLoader] = useState(false);

  const userObj: State<User> = useHookstate(userStore);
  console.log('kia ha user oject=====>>>>', userObj?.user?.userId?.get());

  useEffect(() => {
    // call the function
    fetchUser('7884157c-1332-4f10-95a6-b9a22ca5507b');
    // fetchPosts();
    return () => {
      setLimit(10);
    };
  }, []);

  const fetchUser = async (userId: string) => {
    getUserByUserId({userID: userId})
      .then(res => {
        if (res?.ok) {
          console.log('response', res.data);
          //* User found
          //todo: Show post and store in state userId of User
        } else {
          console.log('error', res?.data);
          //! no User Found
          //todo: Create User then show posts
        }
      })
      .catch();
    console.log('user', userId);
  };

  const fetchPosts = (req?: CannyPosts, bottomLoader?: boolean) => {
    console.log(req);
    if (bottomLoader) {
      setItemsLoader(true);
    } else {
      setLoading(true);
    }
    getPosts(req)
      .then(res => {
        if (res.ok) {
          const {posts}: any = res?.data;
          // console.log('data', posts);
          handlePosts(posts);
        }
      })
      // make sure to catch any error
      .catch(err => {
        console.log(err);
        setLoading(false);
        setItemsLoader(false);
      });
  };

  const handlePosts = (data: any[]) => {
    setPostsData(data);
    setLoading(false);
    setItemsLoader(false);
  };

  const renderList = (item: any, index: number) => {
    return (
      <CstmPressable
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          paddingVertical: 20,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: colors.primary,
          elevation: 2,
          backgroundColor: colors.background,
        }}
        onPress={() =>
          navigation.navigate('Stack1', {screen: 'Post', params: {id: item.id}})
        }>
        <View
          style={{
            flex: 0.25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item.author.avatarURL ? (
            <Image
              source={{uri: item.author.avatarURL}}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
              }}
            />
          ) : (
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
              }}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#ffffff'}}>
                {item.author.name.substring(0, 1).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <View style={{flex: 0.7}}>
          <Text
            style={{
              color: colors.text,
              fontFamily: 'sans-serif',
              fontSize: 16,
              fontWeight: 'bold',
            }}
            numberOfLines={2}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: colors.text,
                fontFamily: 'sans-serif',
              }}>
              {item.author.name}
            </Text>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 5,
                backgroundColor: 'grey',
                alignSelf: 'center',
                top: 1,
                margin: 8,
              }}
            />
            <Text
              style={{
                color: colors.text,
                fontSize: 12,
                textAlignVertical: 'center',
              }}>
              {moment(item?.created).format('MMM DD')}
            </Text>
          </View>
          <Text style={{color: colors.text, fontFamily: 'sans-serif-medium'}}>
            Status: {item.status.toUpperCase()}
          </Text>
        </View>
        <View
          style={{
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
              backgroundColor: colors.primary,
            }}>
            <MCI
              name="arrow-up-thick"
              color={'#ffffff'}
              style={{alignSelf: 'center', margin: 2}}
            />
            <Text style={{textAlignVertical: 'center', color: '#ffffff'}}>
              {item.score}
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
              backgroundColor: colors.primary,
            }}>
            <MCI
              name="chat"
              color={'#ffffff'}
              style={{alignSelf: 'center', margin: 2}}
            />
            <Text style={{textAlignVertical: 'center', color: '#ffffff'}}>
              {item.commentCount}
            </Text>
          </View>
        </View>
      </CstmPressable>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Loader isShow={loading} />
      <FlatList
        data={postsData}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => fetchPosts()} />
        }
        style={{paddingTop: 10, paddingHorizontal: 15}}
        contentContainerStyle={{flex: postsData.length > 0 ? 0 : 1}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NotFound label="Posts" />}
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          fetchPosts({limit: limit + 10}, true);
          setLimit(state => state + 10);
        }}
        ListFooterComponent={() => {
          return (
            <View style={{height: itemsLoader ? SCREEN_HEIGHT * 0.07 : 0}}>
              {itemsLoader && (
                <ActivityIndicator
                  size={'large'}
                  color={colors.primary}
                  style={{height: '100%'}}
                />
              )}
            </View>
          );
        }}
        renderItem={({item, index}) => renderList(item, index)}
      />
      <FloatButton
        onPress={() => navigation.navigate('Stack1', {screen: 'CreatePost'})}
      />
    </View>
  );
};

export default SendFeedbackScreen;
