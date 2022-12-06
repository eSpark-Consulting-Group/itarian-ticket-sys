import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {useRoute, useTheme} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  getPostbyId as getPostDetails,
  getCommentsByPostId as getComments,
} from '../../utils';
import {CstmPressable, GapView, Loader} from '../../../../components';
import moment from 'moment';

export default function Post() {
  const {colors, dark} = useTheme();
  const route: any = useRoute();
  const [loading, setLoading] = useState(false);
  const [commLoad, setCommLoad] = useState(false);
  const [postDetail, setPostDetail] = useState<any>({});
  const [commDetail, setCommDetail] = useState<any>({});

  useEffect(() => {
    const {id} = route?.params;
    console.log(id);
    fetchPostDetail(id);
    fetchPostComments(id);
  }, [route?.params]);

  const fetchPostDetail = (id: string) => {
    // call the function
    setLoading(true);
    getPostDetails({id})
      .then(res => {
        if (res.ok) {
          handlePostDetails(res?.data);
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

  const handlePostDetails = (data: any) => {
    console.log('byID==>>', data);
    setPostDetail(data);
    setLoading(false);
  };

  const handlePostComments = (data: any) => {
    console.log('Comments by PostID=>>', data);
    setCommLoad(false);
    setCommDetail(data);
  };

  const renderImageList = ({item, index}: {item: string; index: number}) => {
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
        <FlatList data={postDetail?.imageURLs} renderItem={renderImageList} />
        <GapView mode="vertical" length={15} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <CstmPressable
              style={{flexDirection: 'row'}}
              android_ripple={{borderless: true}}>
              <MCI
                name="chat"
                size={20}
                style={{
                  alignSelf: 'center',
                  margin: 2,
                  color: colors.text + '88',
                }}
              />
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
            <CstmPressable android_ripple={{borderless: true}}>
              <View style={{flexDirection: 'row'}}>
                <MCI
                  name="arrow-up-thick"
                  size={22}
                  style={{
                    alignSelf: 'center',
                    margin: 2,
                    color: colors.text + '88',
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    textAlignVertical: 'center',
                    fontWeight: 'bold',
                    color: colors.text + '88',
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
        <GapView />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <CstmPressable
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              android_ripple={{borderless: true}}>
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
            android_ripple={{borderless: true}}>
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
      <Loader isShow={loading && commLoad} />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingTop: 10,
          }}>
          {!loading && !commLoad && <PostView />}
        </View>
      </ScrollView>
    </>
  );
}
