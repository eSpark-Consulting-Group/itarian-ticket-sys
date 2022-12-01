import React, {useRef, useState, useEffect, useReducer} from 'react';
import {View, Keyboard, ScrollView} from 'react-native';

import styles from './style';
import {
  CstmButton,
  CstmDropDown,
  CstmInput,
  CstmMultiLine,
  CstmTitleInput,
  GapView,
} from '../../components';

const SendFeedbackScreen = () => {
  const [categoryToggle, setCategoryToggle] = useState(false);
  const iskeyboardShown = useRef(false);

  const handleLabel = (value: string, type: string) => {
    // 👇️ take parameter passed from Child component
    console.log('kia ha value && type', value, type);
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

  let ideaData = [
    'Service',
    'Support',
    '24/7 Response Time',
    'Professionalism',
    'Ease of Access',
  ];

  const dropDownDataSource = [
    {
      data: ideaData,
      type: 'category',
      toggleValue: categoryToggle,
      title: 'Select Category',
    },
  ];

  return (
    <>
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
        <CstmTitleInput title="Title" placeholder="Enter a Short Title" />
        <GapView mode="vertical" />
        <CstmMultiLine
          title="Details"
          placeholder="Any, Additional Details..."
        />
      </ScrollView>
      <View>
        <CstmButton
          loader={false}
          title="Create Post"
          onPress={() => console.log('Sent the Feedback')}
        />
      </View>
    </>
  );
};

export default SendFeedbackScreen;
