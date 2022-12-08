import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Keyboard,
  ScrollView,
  Text,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {moderateVerticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-get-random-values';
// @ts-ignore
import {v4 as uuid} from 'uuid';

import styles from '../../screens/SendFeedback/style';
import {
  CstmButton,
  CstmDropDown,
  CstmMultiLine,
  CstmPressable,
  CstmTitleInput,
  GapView,
  Loader,
} from '../../components';
import {createPost, getCategories} from '../../screens/SendFeedback/utils';
import {Canny_CreatePost} from '../../types';
import {showMessage} from 'react-native-flash-message';

interface ImageType {
  id: number;
  uri: string;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CreatePost = () => {
  const {colors, dark} = useTheme();
  const [loading, setLoading] = useState(false);
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [categoryData, setCategoryData] = useState<any>([]);
  const [imageData, setImageData] = useState<ImageType[]>([]);
  const [postData, setPostData] = useState<{
    categoryID?: string;
    title: string;
    details: string;
    imageURLs?: string[];
  }>({
    categoryID: '',
    title: '',
    details: '',
    imageURLs: [],
  });
  const iskeyboardShown = useRef(false);

  const handleLabel = (value: {id?: string; name?: string}, type: string) => {
    // 👇️ take parameter passed from Child component
    const {id} = value;
    console.log('kia ha value', value);
    setPostData((state: any) => {
      return {...state, categoryID: id};
    });
  };

  useEffect(() => {
    // call the function
    setLoading(true);
    getCategories()
      .then(res => {
        if (res.ok) {
          const {categories}: any = res?.data;
          console.log('data', categories);
          handleCategories(categories);
        }
      })
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const handleCategories = (data: any[]) => {
    const tempArr = data.map(item => {
      return {name: item.name, id: item.id};
    });
    setCategoryData(tempArr);
    setLoading(false);
  };

  useEffect(() => {
    let show = Keyboard.addListener('keyboardDidShow', () => {
      iskeyboardShown.current = true;
    });
    let hide = Keyboard.addListener('keyboardDidHide', () => {
      iskeyboardShown.current = false;
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, [iskeyboardShown.current]);

  const handleToggle = (type: string) => {
    switch (type) {
      case 'category':
        if (categoryToggle) {
          setCategoryToggle(false);
        } else {
          setCategoryToggle(true);
        }
        return;
      default:
        return;
    }
  };

  const dropDownDataSource = [
    {
      data: categoryData,
      type: 'category',
      toggleValue: categoryToggle,
      title: 'Select Category',
    },
  ];

  const handleDeleteImage = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const tempArr = [...imageData].filter(item => item.id !== id);
    setImageData(tempArr);
  };

  const renderImages = ({item, index}: {item: any; index: number}) => {
    return (
      <View
        style={{
          borderWidth: 2,
          borderColor: colors.primary,
        }}>
        <View
          style={{
            position: 'absolute',
            height: 20,
            width: 20,
            borderRadius: 20,
            backgroundColor: colors.primary,
            zIndex: 99,
            top: -10,
            right: -10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons
            name="close"
            color={'#fff'}
            onPress={() => handleDeleteImage(item.id)}
          />
        </View>
        <Image
          style={{
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={item}
        />
      </View>
    );
  };

  const handleUploadImage = () => {
    ImagePicker.openPicker({})
      .then(image => {
        const field = image.path;
        console.log({uri: image.path});
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setImageData((state: ImageType[]) => {
          return [...state, {uri: field, id: uuid()}];
        });
      })
      .catch(err => console.log('err', err));
  };

  const ImageContainer = () => {
    return (
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: colors.text,
            height: moderateVerticalScale(25, 0),
            opacity: 0.7,
            fontSize: 14,
            fontFamily: 'sans-serif-medium',
          }}>
          Select Image
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: colors.primary,
            }}>
            <CstmPressable
              style={{
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleUploadImage()}>
              <Text
                style={{
                  color: colors.text,
                  textAlignVertical: 'center',
                  height: moderateVerticalScale(25, 0),
                  opacity: 0.7,
                  fontSize: 14,
                  fontFamily: 'sans-serif-medium',
                }}>
                Upload Image
              </Text>
            </CstmPressable>
          </View>
        </View>
        <GapView mode="vertical" />
        <View>
          <FlatList
            data={imageData}
            horizontal
            contentContainerStyle={{padding: 10}}
            ItemSeparatorComponent={() => (
              <GapView mode="horizontal" length={15} />
            )}
            showsHorizontalScrollIndicator={false}
            renderItem={renderImages}
          />
        </View>
      </View>
    );
  };

  const handleCreatePost = () => {
    setLoading(true);
    const tempArr = [...imageData];
    const finalArr: string[] = tempArr.reduce(
      (accumulator: string[], {uri}) => [...accumulator, uri],
      [],
    );
    postData.imageURLs = finalArr;
    const req: Canny_CreatePost = {
      ...postData,
      boardID: '63185908b6e18a2a54582097',
      authorID: '6391eb3af8764e24a1536991',
    };
    console.log('Sending Request Body', req);

    createPost(req)
      .then(res => {
        if (res.ok) {
          console.log(res?.data);
          setLoading(false);
          showMessage({
            message: 'Succesfully Created Post',
            type: 'success',
          });
        }
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
        showMessage({
          message: err,
          type: 'danger',
        });
      });
  };

  return (
    <>
      <Loader isShow={loading} />
      <ScrollView
        style={{
          ...styles.container,
        }}>
        {dropDownDataSource.map((val, int) => (
          <CstmDropDown
            key={int}
            dataSource={val.data}
            handleLabel={handleLabel}
            type={val.type}
            toggleValue={val.toggleValue}
            handleToggle={handleToggle}
            title={val.title}
          />
        ))}
        <CstmTitleInput
          title="Title"
          placeholder="Enter a Short Title"
          value={postData.title}
          onChangeText={text =>
            setPostData((state: any) => {
              return {...state, title: text};
            })
          }
        />
        <GapView mode="vertical" length={25} />
        <CstmMultiLine
          title="Details"
          placeholder="Any, Additional Details..."
          onChangeText={text =>
            setPostData((state: any) => {
              return {...state, details: text};
            })
          }
        />
        <GapView mode="vertical" length={20} />
        <ImageContainer />
      </ScrollView>
      <View>
        <CstmButton
          loader={false}
          title="Create Post"
          onPress={() => handleCreatePost()}
        />
      </View>
    </>
  );
};

export default CreatePost;
