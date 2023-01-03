import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import {
  useTheme,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcons from 'react-native-vector-icons/MaterialIcons';
import { useHookstate, State } from '@hookstate/core';
import moment from 'moment';
import { Divider } from 'react-native-paper';

import { userStore } from '../../stores/userStore';
import { CannyBoards, Canny_CreateUser, User } from '../../types';
import {
  CstmPressable,
  FloatButton,
  GapView,
  Loader,
  NotFound,
} from '../../components';
import { getPosts, getUserByEmail, createUser, getBoards } from './utils';
import { CannyPosts } from '../../types';
import { SCREEN_HEIGHT, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../constants';
import { useUpdateEffect } from '../../utils/hooks';
import { removeDuplicates } from '../../utils/helperFunctions';
import { showMessage } from 'react-native-flash-message';

const SendFeedbackScreen = () => {
  const { dark, colors } = useTheme();
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showPosts, setShowPosts] = useState<boolean>(false);
  const [postsData, setPostsData] = useState<any>([]);
  const [boardsData, setBoardsData] = useState<CannyBoards[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [itemsLoader, setItemsLoader] = useState(false);
  const [searchPosts, setSearchPosts] = useState('');
  const [cannyUser, setCannyUser] = useState<Canny_CreateUser>();
  const [showSearch, setShowSearch] = useState<boolean>();
  const userObj: State<User> = useHookstate(userStore);
  const searchRef = useRef<TextInput>(null);

  const { email, user_name, userId }: any = userObj?.user.get();

  useEffect(() => {
    setShowPosts(false);
    fetchUser(email);
    console.log('email of logged in user:?', email);
    console.log('user_name of logged in user:?', user_name);
    console.log('userId of logged in user:?', userId);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setSkip(0);
      if (showPosts) {
        fetchPosts();
      }
      return () => {
        setPostsData([]);
      };
    }, [showPosts]),
  );

  const fetchUser = async (email?: string) => {
    console.log(email);
    if (email) {
      setLoading(true);
      getUserByEmail({ email: email })
        .then(res => {
          if (res?.ok) {
            console.log('User already created!', res?.data);
            setCannyUser(res?.data);
            fetchBoards();
            showMessage({
              message: 'User Found',
              autoHide: true,
              type: 'info',
            });
            //* User found
            //todo: Show post and store in state userId of User
          } else {
            if (res?.data?.error === 'invalid email') {
              setPostsData([]);
              handleCreateUser();
              showMessage({
                message: 'User Not Found, Creating...',
                autoHide: true,
                type: 'info',
              });
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
    // console.log(data);
    createUser(data)
      .then(res => {
        if (res?.ok) {
          console.log('User Created Sucessfully', res?.data);
          setCannyUser(res?.data);
          fetchBoards();
          //* User Created Sucessfully
          //todo: Show posts now and store userId
        } else {
          //! User not Created Sucessfully
          if (res?.data?.error === 'wrong user id supplied') {
            console.log('User already Existed', res?.data);
          }
          console.log('User not Created Sucessfully');
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        // console.log('Error on Api CreateUser');
      });
  };

  const fetchBoards = () => {
    setLoading(true);
    getBoards()
      .then(res => {
        if (res.ok) {
          if (res.data) {
            // console.log('Boards fetched', res.data);
            setBoardsData(res?.data?.boards);
          }
          setLoading(false);
        }
      })
      .catch(err => {
        // console.log('boards fetching failed', err);
        setLoading(false);
      });
  };

  const fetchPosts = (
    req?: CannyPosts,
    bottomLoader?: boolean,
    searchFlag?: boolean,
  ) => {
    console.log('Fetch posts ki request', req);
    if (bottomLoader) {
      setItemsLoader(true);
    } else {
      setLoading(true);
    }
    getPosts(req)
      .then(res => {
        if (res.ok) {
          const { posts }: any = res?.data;
          // console.log('Gotten posts', posts);
          handlePosts(posts, searchFlag);
        }
      })
      // make sure to catch any error
      .catch(err => {
        // console.log(err);
        setLoading(false);
        setItemsLoader(false);
      });
  };

  const handlePosts = (data: any[], flag: boolean = false) => {
    console.log(postsData, 'posts 00000000000000000000000000');
    console.log(data, 'data xxxxxxxxxxxxxxxxxxxxxxxxx');
    if (flag) {
      setPostsData(data);
      setLoading(false);
      setItemsLoader(false);
    } else {
      const listData = removeDuplicates(postsData, data);
      setPostsData(listData);
      setLoading(false);
      setItemsLoader(false);
    }
  };

  const resetLoad = () => {
    setPostsData([]);
    setSkip(0);
    fetchPosts({ limit: 10, skip: 0 }, false);
  };

  const clearPostSearch = () => {
    searchRef.current?.clear();
    setSearchPosts('');
  };

  // useUpdateEffect(() => {
  //   console.log('-----------------------------------------------------');
  //   fetchPosts({limit: 10, skip: skip}, true);
  // }, [skip]);

  const renderPostList = (item: any, index: number) => {
    console.log('....????????', item.author);
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
            params: { id: item.id, userInfo: cannyUser },
          });
        }}>
        <View
          style={{
            flex: 0.25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item?.author?.avatarURL ? (
            <Image
              source={{ uri: item?.author?.avatarURL }}
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
                style={{ fontSize: 20, fontWeight: 'bold', color: '#ffffff' }}>
                {item?.author?.name.substring(0, 1).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <View style={{ flex: 0.7 }}>
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
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: colors.text,
                fontFamily: 'sans-serif',
              }}>
              {item?.author?.name}
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
          <Text style={{ color: colors.text, fontFamily: 'sans-serif-medium' }}>
            Status: {item?.status?.toUpperCase()}
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
              style={{ alignSelf: 'center', margin: 2 }}
            />
            <Text style={{ textAlignVertical: 'center', color: '#ffffff' }}>
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
              style={{ alignSelf: 'center', margin: 2 }}
            />
            <Text style={{ textAlignVertical: 'center', color: '#ffffff' }}>
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
        }}
        onPress={() => {
          setPostsData([]);
          setSkip(0);
          fetchPosts({ boardID: item.id });
          setShowPosts(true);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          // console.log(item.id);
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
          <Text style={{ color: colors.text, fontFamily: 'sans-serif-medium' }}>
            Posts: {item.postCount}
          </Text>
        </View>
      </CstmPressable>
    );
  };

  const PostsListComponent = () => {
    return (
      <>
        <View style={{ paddingTop: 10, paddingHorizontal: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: WINDOW_HEIGHT * 0.06,
              marginBottom: 5,
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  display: showSearch ? 'flex' : 'none',
                  alignItems: 'center',
                }}>
                <TextInput
                  ref={searchRef}
                  underlineColorAndroid={'transparent'}
                  autoCorrect={false}
                  scrollEnabled={false}
                  multiline={false}
                  returnKeyType="search"
                  selectionColor={colors.primary}
                  style={{
                    height: '100%',
                    width: WINDOW_WIDTH * 0.75,
                    fontSize: 18,
                    color: colors.text,
                    textDecorationLine: 'none',
                  }}
                  onChangeText={text => setSearchPosts(text)}
                  value={searchPosts}
                  placeholderTextColor={colors.text + '55'}
                  placeholder="Search Posts..."
                  onSubmitEditing={() => {
                    fetchPosts({ search: searchPosts }, false, true);
                  }}
                />
                <CstmPressable
                  android_ripple={{ borderless: true }}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut,
                    );
                    clearPostSearch();
                    if (searchPosts != '') {
                      fetchPosts({ limit: 10 }, false);
                    }
                  }}>
                  <Ionicons
                    name="md-close"
                    style={{
                      alignSelf: 'center',
                      textAlignVertical: 'center',
                      opacity: 0.5,
                    }}
                    color={colors.text}
                    size={20}
                  />
                </CstmPressable>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  display: showSearch ? 'none' : 'flex',
                }}>
                <CstmPressable
                  android_ripple={{ borderless: true }}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut,
                    );
                    setPostsData([]);

                    setShowPosts(false);
                    clearPostSearch();
                  }}>
                  <Ionicons
                    name="md-chevron-back-sharp"
                    style={{ alignSelf: 'center', textAlignVertical: 'center' }}
                    color={colors.primary}
                    size={28}
                  />
                </CstmPressable>
                <GapView mode="horizontal" />
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: 'sans-serif',
                    fontSize: 20,
                  }}>
                  Posts
                </Text>
              </View>
            </View>
            <View style={{ marginRight: 10 }}>
              <CstmPressable
                android_ripple={{ borderless: true }}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  setShowSearch(!showSearch);
                  clearPostSearch();
                }}>
                <MatIcons
                  name={showSearch ? 'search-off' : 'search'}
                  style={{ alignSelf: 'center', textAlignVertical: 'center' }}
                  color={colors.primary}
                  size={28}
                />
              </CstmPressable>
            </View>
          </View>
          <Divider style={{ height: 2, backgroundColor: colors.primary }} />
        </View>
        <FlatList
          data={postsData}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => resetLoad()} />
          }
          style={{ paddingTop: 10, paddingHorizontal: 15 }}
          contentContainerStyle={{ flex: postsData.length > 0 ? 0 : 1 }}
          showsVerticalScrollIndicator={true}
          ListEmptyComponent={
            <NotFound
              label="Posts"
              display={loading || postsData.length !== 0 ? 'none' : 'flex'}
            />
          }
          onEndReached={() => {
            if (postsData.length > 8) {
              fetchPosts({ skip: skip + 10 }, true);
              setSkip(state => state + 10);
            }
          }}
          ListFooterComponent={() => {
            return (
              <View style={{ height: itemsLoader ? SCREEN_HEIGHT * 0.07 : 10 }}>
                <ActivityIndicator
                  size={'large'}
                  color={colors.primary}
                  style={{
                    height: '100%',
                    display: itemsLoader ? 'flex' : 'none',
                  }}
                />
              </View>
            );
          }}
          renderItem={({ item, index }) => renderPostList(item, index)}
        />
        <FloatButton
          onPress={() =>
            navigation.navigate('Stack1', { screen: 'CreatePost' })
          }
        />
      </>
    );
  };

  const BoardsListComponent = () => {
    return (
      <>
        <View style={{ paddingTop: 10, paddingHorizontal: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: WINDOW_HEIGHT * 0.06,
              marginBottom: 5,
            }}>
            <Text
              style={{
                color: colors.text,
                fontFamily: 'sans-serif',
                fontSize: 20,
              }}>
              Boards
            </Text>
          </View>
          <Divider style={{ height: 2, backgroundColor: colors.primary }} />
        </View>
        <FlatList
          data={boardsData}
          style={{ paddingTop: 10, paddingHorizontal: 15 }}
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
          ListEmptyComponent={
            <NotFound
              label="Boards"
              display={loading || boardsData.length !== 0 ? 'none' : 'flex'}
            />
          }
          renderItem={({ item, index }) => renderBoardsList(item, index)}
        />
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Loader isShow={loading} />
      {showPosts ? PostsListComponent() : <BoardsListComponent />}
    </View>
  );
};

export default SendFeedbackScreen;
