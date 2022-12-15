import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  useRoute,
  useTheme,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import EI from 'react-native-vector-icons/Entypo';
// @ts-ignore
import Pinchable from 'react-native-pinchable';
import moment from 'moment';

import {
  getPostbyId as getPostDetails,
  getCommentsByPostId as getComments,
  fetchVotes,
  createVote,
  deleteVote,
} from '../../utils';
import {CstmPressable, GapView, Loader} from '../../../../components';
import {WINDOW_HEIGHT} from '../../../../constants';
import {Vote, Vote_CD} from '../../../../types';

export default function Post() {
  const {colors, dark} = useTheme();
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const [loading, setLoading] = useState(false);
  const [commLoad, setCommLoad] = useState(false);
  const [postDetail, setPostDetail] = useState<any>({});
  const [commDetail, setCommDetail] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userVoted, setuserVoted] = useState<boolean>(false);
  const {id, userInfo} = route?.params;

  useFocusEffect(
    useCallback(() => {
      console.log(id, userInfo);
      fetchPostDetail(id, false);
      fetchPostComments(id);
      fetchPostVotes({postID: id, userID: userInfo.id});
      //? will fetch votes for current user for the current post
    }, [route?.params]),
  );

  const fetchPostDetail = (
    id: string,
    voteFlag?: boolean,
    voteValue?: boolean,
  ) => {
    // call the function
    if (!voteFlag) {
      setLoading(true);
    }
    getPostDetails({id})
      .then(res => {
        if (res.ok) {
          handlePostDetails(res?.data);
          if (voteFlag) {
            if (voteValue !== undefined) setuserVoted(voteValue);
          }
        }
      })
      // make sure to catch any error
      .catch(console.error);
  };

  const fetchPostComments = (postID: string) => {
    // call the function
    setCommLoad(true);
    getComments({postID})
      .then(res => {
        if (res.ok) {
          handlePostComments(res?.data);
        }
      }) // make sure to catch any error
      .catch(console.error);
  };

  const fetchPostVotes = (req: Vote) => {
    console.log(req);
    fetchVotes(req)
      .then(res => {
        if (res.ok) {
          console.log(res?.data);
          if (res.data !== undefined) {
            if (res?.data?.votes.length > 0) {
              console.log('user has not voted');
              setLoading(false);
              setuserVoted(true);
            } else {
              setLoading(false);
            }
          }
        }
      })
      .catch(err => console.log('err fetch vote', err));
  };

  const handleCreateVote = (req: Vote_CD) => {
    createVote(req)
      .then(res => {
        if (res.ok) {
          console.log('Created a Vote for the Post/Comment', res?.data);
          fetchPostDetail(id, true, true);
        }
      })
      .catch(err => console.log('err create vote', err));
  };

  const handleDeleteVote = (req: Vote_CD) => {
    deleteVote(req)
      .then(res => {
        if (res.ok) {
          console.log('Deleted a Vote for the Post/Comment', res?.data);
          fetchPostDetail(id, true, false);
        }
      })
      .catch(err => console.log('err delete vote', err));
  };

  const handlePostDetails = (data: any) => {
    console.log('byID==>>', data);
    setPostDetail(data);
  };

  const handlePostComments = (data: any) => {
    console.log('Comments by PostID=>>', data);
    setCommLoad(false);
    setCommDetail(data);
  };

  const renderImageList = ({
    item,
    index,
    flag,
  }: {
    item: string;
    index: number;
    flag?: boolean;
  }) => {
    return (
      <View
        style={{
          marginTop: 10,
          height: flag ? WINDOW_HEIGHT * 0.15 : WINDOW_HEIGHT * 0.2,
          width: flag ? WINDOW_HEIGHT * 0.15 : WINDOW_HEIGHT * 0.2,
          backgroundColor: 'pink',
        }}>
        <Pinchable>
          <Image
            source={{uri: item}}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
          />
        </Pinchable>
      </View>
    );
  };

  const PostBox = (): JSX.Element => {
    return (
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
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              {postDetail?.author?.name.substring(0, 1).toUpperCase()}
            </Text>
          </View>
          <GapView mode="horizontal" length={5} />
          <Text style={{color: colors.text}}>{postDetail?.author?.name}</Text>
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
          <Text style={{color: colors.text}}>
            {moment(postDetail?.created).fromNow()}
          </Text>
        </View>
        <Text style={{color: colors.text, fontSize: 24}}>
          {postDetail?.title}
        </Text>
        <GapView mode="vertical" />
        <Text style={{color: colors.text, opacity: 0.7}}>
          {postDetail?.details}
        </Text>
        <FlatList
          horizontal
          ItemSeparatorComponent={() => (
            <GapView mode="horizontal" length={10} />
          )}
          data={postDetail?.imageURLs}
          renderItem={renderImageList}
        />
        <GapView mode="vertical" length={15} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CstmPressable
              style={{flexDirection: 'row'}}
              android_ripple={{borderless: true}}
              onPress={() =>
                navigation.navigate('Stack2', {
                  screen: 'CreateComment',
                  params: {...route?.params},
                })
              }>
              <MCI
                name="chat"
                size={18}
                style={{
                  alignSelf: 'center',
                  color: colors.text + '88',
                }}
              />
              <GapView mode="horizontal" length={5} />
              <Text
                style={{
                  color: colors.text + '88',
                  fontSize: 16,
                  textAlignVertical: 'center',
                  fontWeight: 'bold',
                }}>
                {postDetail?.commentCount}
              </Text>
            </CstmPressable>
            <GapView mode="horizontal" length={20} />
            <CstmPressable
              android_ripple={{borderless: true}}
              onPress={() =>
                userVoted == true
                  ? handleDeleteVote({postID: id, voterID: userInfo.id})
                  : handleCreateVote({postID: id, voterID: userInfo.id})
              }>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 5,
                }}>
                <EI
                  name="arrow-bold-up"
                  size={18}
                  style={{
                    alignSelf: 'center',
                    color:
                      userVoted == true ? colors.primary : colors.text + '88',
                  }}
                />
                <GapView mode="horizontal" length={5} />
                <Text
                  style={{
                    fontSize: 16,
                    textAlignVertical: 'center',
                    fontWeight: 'bold',

                    color:
                      userVoted == true ? colors.primary : colors.text + '88',
                  }}>
                  {postDetail?.score}
                </Text>
              </View>
            </CstmPressable>
          </View>

          <CstmPressable android_ripple={{borderless: true}}>
            <MCI
              name="dots-horizontal"
              size={22}
              style={{
                alignSelf: 'center',
                margin: 2,
                color: colors.text + '88',
              }}
            />
          </CstmPressable>
        </View>
      </View>
    );
  };

  const PostView = (): JSX.Element => {
    return (
      <FlatList
        style={{
          backgroundColor: colors.background,
        }}
        scrollEnabled={false}
        data={commDetail?.comments}
        ListHeaderComponent={<PostBox />}
        ListHeaderComponentStyle={{marginBottom: 8}}
        renderItem={renderComments}
        ListEmptyComponent={
          <View
            style={{
              height: WINDOW_HEIGHT * 0.3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.text + '88',
                fontSize: 20,
                fontFamily: 'sans-serif-medium',
              }}>
              No Comments Yet!
            </Text>
          </View>
        }
        ListFooterComponent={() => <GapView />}
        ItemSeparatorComponent={() => (
          <View style={{backgroundColor: colors.background}}>
            <GapView length={1} />
          </View>
        )}
      />
    );
  };

  const CommentComponent = ({item, index}: {item: any; index?: number}) => {
    let replyCount = 0;
    {
      commDetail?.comments?.map((item2: any, index: number) => {
        if (item2.parentID === item.id) {
          replyCount++;
        }
      });
    }
    return (
      <View style={{paddingHorizontal: 15}}>
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
              width: 20,
              height: 20,
              borderRadius: 20,
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 10}}>
              {item?.author?.name.substring(0, 1).toUpperCase()}
            </Text>
          </View>
          <GapView mode="horizontal" length={5} />
          <Text style={{color: colors.text, fontSize: 12}}>
            {item?.author?.name}
          </Text>
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
          <Text style={{color: colors.text, fontSize: 12}}>
            {moment(item?.created).fromNow()}
          </Text>
        </View>
        <GapView />
        <Text
          style={{
            color: colors.text,
            opacity: 0.7,
            fontSize: 12,
          }}>
          {item?.value}
        </Text>
        <FlatList
          horizontal
          ItemSeparatorComponent={() => (
            <GapView mode="horizontal" length={10} />
          )}
          data={item?.imageURLs}
          renderItem={({item, index}) =>
            renderImageList({item, index, flag: true})
          }
        />
        <GapView />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <CstmPressable
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              android_ripple={{borderless: true}}
              onPress={() => {
                console.log('==xx>>>', item);
                navigation.navigate('Stack2', {
                  screen: 'CreateComment',
                  params: {
                    ...route?.params,
                    parentID: item.parentID === null ? item.id : item.parentID,
                  },
                });
              }}>
              <View style={{flexDirection: 'row'}}>
                <MCI
                  name="chat"
                  size={16}
                  style={{
                    alignSelf: 'center',
                    color: colors.text + '88',
                    padding: 2,
                  }}
                />
                <Text
                  style={{
                    color: colors.text + '88',
                    fontSize: 12,
                    padding: 2,
                    textAlignVertical: 'center',
                  }}>
                  {replyCount}
                </Text>
              </View>
            </CstmPressable>
            <GapView mode="horizontal" length={20} />
            <CstmPressable
              android_ripple={{borderless: true}}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                console.log('comment item', item);
              }}>
              <View style={{flexDirection: 'row'}}>
                <MCI
                  name="arrow-up-thick"
                  size={16}
                  style={{
                    alignSelf: 'center',
                    color: colors.text + '88',
                    padding: 2,
                  }}
                />
                <Text
                  style={{
                    color: colors.text + '88',
                    fontSize: 12,
                    textAlignVertical: 'center',
                    padding: 2,
                  }}>
                  {item?.likeCount}
                </Text>
              </View>
            </CstmPressable>
          </View>
          <CstmPressable
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            android_ripple={{borderless: true}}
            onPress={() => setModalVisible(true)}>
            <MCI
              name="dots-horizontal"
              size={22}
              style={{
                alignSelf: 'center',
                color: colors.text + '88',
              }}
            />
          </CstmPressable>
        </View>
        <GapView />
      </View>
    );
  };

  const renderComments = ({item, index}: {item: any; index: number}) => {
    return (
      <>
        {item.parentID == null && (
          <View
            style={{
              paddingVertical: 15,
              backgroundColor: colors.card,
            }}>
            <CommentComponent item={item} />
            {commDetail?.comments.map((item2: any, index: number) => {
              if (item2.parentID === item.id) {
                return (
                  <View key={item2.id + index}>
                    <View
                      style={{
                        marginLeft: 25,
                        borderLeftWidth: 3,
                        borderLeftColor: colors.background,
                      }}>
                      <CommentComponent item={item2} />
                    </View>
                  </View>
                );
              }
            })}
          </View>
        )}
      </>
    );
  };

  return (
    <>
      <Loader isShow={loading || commLoad} />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingTop: 10,
          }}>
          {!loading && !commLoad && <PostView />}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <TouchableWithoutFeedback
            style={{
              flex: 1,
            }}
            onPress={() => setModalVisible(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#000',
                opacity: 0.4,
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: colors.card,
              padding: 10,
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRadius: 10,
              }}>
              <CstmPressable
                onPress={() => setModalVisible(false)}
                android_ripple={{borderless: true}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 16,
                      fontFamily: 'sans-serif-medium',
                    }}
                    onPress={() => setModalVisible(false)}>
                    Delete Comment
                  </Text>
                  <MCI
                    name="delete-outline"
                    size={22}
                    style={{
                      alignSelf: 'center',
                      color: colors.text,
                    }}
                  />
                </View>
              </CstmPressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
