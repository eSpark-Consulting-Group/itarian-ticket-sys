import React, {useRef, useState, useEffect} from 'react';
import {View, Keyboard, ScrollView} from 'react-native';

import styles from '../../screens/SendFeedback/style';
import {
  CstmButton,
  CstmDropDown,
  CstmMultiLine,
  CstmTitleInput,
  GapView,
  Loader,
} from '../../components';
import {getCategories} from '../../screens/SendFeedback/utils';
import {CannyCategory} from '../../types';

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [categoryData, setCategoryData] = useState<any>([]);
  const [postData, setPostData] = useState<{
    category: {id: string; name: string};
    title: string;
    details: string;
  }>({
    category: {id: '', name: ''},
    title: '',
    details: '',
  });
  const iskeyboardShown = useRef(false);

  const handleLabel = (value: {}, type: string) => {
    // 👇️ take parameter passed from Child component
    console.log('kia ha value && type', value);
    setPostData((state: any) => {
      return {...state, category: value};
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
        <GapView mode="vertical" />
        <CstmMultiLine
          title="Details"
          placeholder="Any, Additional Details..."
          onChangeText={text =>
            setPostData((state: any) => {
              return {...state, details: text};
            })
          }
        />
      </ScrollView>
      <View>
        <CstmButton
          loader={false}
          title="Create Post"
          onPress={() => console.log('Create Post', postData)}
        />
      </View>
    </>
  );
};

export default CreatePost;
