import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  LayoutAnimation,
} from 'react-native';
import {
  useTheme,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useHookstate, State} from '@hookstate/core';
import moment from 'moment';
import {Divider} from 'react-native-paper';

import {userStore} from '../../stores/userStore';
import {CannyBoards, Canny_CreateUser, User} from '../../types';
import {
  CstmPressable,
  FloatButton,
  GapView,
  Loader,
  NotFound,
} from '../../components';
import {getPosts, getUserByUserId, createUser, getBoards} from './utils';
import {CannyPosts} from '../../types';
import {SCREEN_HEIGHT} from '../../constants';

const SendFeedbackScreen = () => {
  const {dark, colors} = useTheme();
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showPosts, setShowPosts] = useState<boolean>(false);
  const [postsData, setPostsData] = useState<any>([]);
  const [boardsData, setBoardsData] = useState<CannyBoards[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [itemsLoader, setItemsLoader] = useState(false);
  const [cannyUser, setCannyUser] = useState<Canny_CreateUser>();
  const userObj: State<User> = useHookstate(userStore);
  const {email, user_name, userId}: any = userObj?.user.get();

  useFocusEffect(
    useCallback(() => {
      // call the function
      // Test wiz userID: '7884157c-1332-4f10-95a6-b9a22ca5507b'
      console.log('what is the userId', userId);
      fetchUser(userId);
      return () => {
        setLimit(10);
      };
    }, []),
  );

  const fetchUser = async (userId?: string) => {
    console.log(userId);
    if (userId) {
      setLoading(true);
      getUserByUserId({userID: userId})
        .then(res => {
          if (res?.ok) {
            console.log('User already created!', res?.data);
            setCannyUser(res?.data);
            // fetchPosts();
            fetchBoards();
            //* User found
            //todo: Show post and store in state userId of User
          } else {
            if (res?.data?.error === 'invalid userID') {
              setPostsData([]);
              handleCreateUser();
              //! No User Found
              //todo: Create User then show posts
            }
            console.log('No User Found', res?.data);
          }
        })
        .catch(err => {
          console.log('user', err);
          setLoading(false);
        });
    }
  };

  const handleCreateUser = async () => {
    const data: Canny_CreateUser = {
      email: email,
      name: user_name,
      userID: userId,
    };
    console.log(data);
    createUser(data)
      .then(res => {
        if (res?.ok) {
          console.log('User Created Sucessfully', res?.data);
          setCannyUser(res?.data);
          // fetchPosts();
          fetchBoards();
          //* User Created Sucessfully
          //todo: Show posts now and store userId
        } else {
          //! User not Created Sucessfully
          console.log('User not Created Sucessfully', res?.data);
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('Error on Api CreateUser');
      });
  };

  const fetchBoards = () => {
    setLoading(true);
    getBoards()
      .then(res => {
        if (res.ok) {
          if (res.data) {
            console.log('Boards fetched', res.data);
            setBoardsData(res?.data?.boards);
          }
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('boards fetching failed', err);
        setLoading(false);
      });
  };

  const fetchPosts = (req?: CannyPosts, bottomLoader?: boolean) => {
    console.log('Fetch posts ki request', req);
    if (bottomLoader) {
      setItemsLoader(true);
    } else {
      setLoading(true);
    }
    getPosts(req)
      .then(res => {
        if (res.ok) {
          const {posts}: any = res?.data;
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
    setShowPosts(true);
  };

  const renderPostList = (item: any, index: number) => {
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
        onPress={() => {
          navigation.navigate('Stack1', {
            screen: 'Post',
            params: {id: item.id, userInfo: cannyUser},
          });
        }}>
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

  const renderBoardsList = (item: CannyBoards, index: number) => {
    return (
      <CstmPressable
        style={{
          marginVertical: 10,
          paddingVertical: 20,
          borderWidth: 2,
          borderRadius: 5,
          borderColor: colors.primary,
          backgroundColor: colors.background,
          elevation: 2,
        }}
        onPress={() => {
          fetchPosts({boardID: item.id});
          setShowPosts(true);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          console.log(item.id);
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Text
            style={{
              color: colors.text,
              fontFamily: 'sans-serif',
              fontSize: 16,
              fontWeight: 'bold',
            }}
            numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={{color: colors.text, fontFamily: 'sans-serif-medium'}}>
            Posts: {item.postCount}
          </Text>
        </View>
      </CstmPressable>
    );
  };

  const PostsListComponent = () => {
    return (
      <>
        <View style={{paddingTop: 10, paddingHorizontal: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CstmPressable
              android_ripple={{borderless: true}}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setPostsData([]);
                setShowPosts(false);
              }}>
              <Ionicons
                name="md-chevron-back-sharp"
                color={colors.primary}
                size={28}
              />
            </CstmPressable>
            <GapView mode="horizontal" />
            <Text
              style={{
                color: colors.text,
                fontFamily: 'sans-serif',
                fontSize: 18,
              }}>
              Posts
            </Text>
          </View>
          <GapView length={4} />
          <Divider style={{height: 2, backgroundColor: colors.primary}} />
        </View>
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
              <View style={{height: itemsLoader ? SCREEN_HEIGHT * 0.07 : 10}}>
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
          renderItem={({item, index}) => renderPostList(item, index)}
        />
        <FloatButton
          onPress={() => navigation.navigate('Stack1', {screen: 'CreatePost'})}
        />
      </>
    );
  };

  const BoardsListComponent = () => {
    return (
      <View>
        <View style={{paddingTop: 10, paddingHorizontal: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 2,
            }}>
            <Text
              style={{
                color: colors.text,
                fontFamily: 'sans-serif',
                fontSize: 18,
              }}>
              Boards
            </Text>
          </View>
          <GapView mode="vertical" length={5} />
          <Divider style={{height: 2, backgroundColor: colors.primary}} />
        </View>
        <FlatList
          data={boardsData}
          style={{paddingTop: 10, paddingHorizontal: 15}}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => fetchBoards()}
            />
          }
          contentContainerStyle={{
            flex: boardsData.length > 0 ? 0 : 1,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<NotFound label="Boards" />}
          renderItem={({item, index}) => renderBoardsList(item, index)}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Loader isShow={loading} />
      {showPosts ? <PostsListComponent /> : <BoardsListComponent />}
    </View>
  );
};

export default SendFeedbackScreen;
