import React, {useRef, useState, useEffect, useReducer} from 'react';
import {View, Text, KeyboardAvoidingView, Keyboard} from 'react-native';
import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../theme/colors';
import {CstmButton, CstmDropDown, CstmMultiLine} from '../../components';

const SendFeedbackScreen = () => {
  const {colors, dark}: Theme = useTheme();

  const [ideaToggle, setIdeaToggle] = useState(false);
  const [errorToggle, setErrorToggle] = useState(false);
  const [feedToggle, setFeedToggle] = useState(false);
  const iskeyboardShown = useRef(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const handleLabel = (value: string, type: string) => {
    // 👇️ take parameter passed from Child component
    console.log('kia ha value && type', value, type);
  };

  useEffect(() => {
    let show = Keyboard.addListener('keyboardDidShow', () => {
      iskeyboardShown.current = true;
      // forceUpdate();
    });
    let hide = Keyboard.addListener('keyboardDidHide', () => {
      iskeyboardShown.current = false;
      // forceUpdate();
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, [iskeyboardShown.current]);

  const handleToggle = (type: string) => {
    switch (type) {
      case 'idea':
        if (ideaToggle) {
          setIdeaToggle(false);
        } else {
          setIdeaToggle(true);
          setFeedToggle(false);
          setErrorToggle(false);
        }
        return;
      case 'feed':
        if (feedToggle) {
          setFeedToggle(false);
        } else {
          setIdeaToggle(false);
          setFeedToggle(true);
          setErrorToggle(false);
        }
        return;
      case 'error':
        if (errorToggle) {
          setErrorToggle(false);
        } else {
          setIdeaToggle(false);
          setFeedToggle(false);
          setErrorToggle(true);
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
  let cantFindData = [
    'How to Add Company?',
    'How to view your tickets?',
    'How to Mark your self out of Office?',
    'Where to Find Contacts?',
  ];
  let errorData = [
    'Tickets no Listed.',
    'Not able to view Contacts',
    'Oppurtunities not Added',
  ];

  const dropDownDataSource = [
    {
      data: ideaData,
      type: 'idea',
      toggleValue: ideaToggle,
      title: "I have an Idea"
    },
    {
      data: cantFindData,
      type: 'feed',
      toggleValue: feedToggle,
      title: "I can't find something"
    },
    {
      data: errorData,
      type: 'error',
      toggleValue: errorToggle,
      title: "I have encountered an error"
    }
  ]

  return (
    <View
      style={{
        // bottom: iskeyboardShown.current ? 100 : 0,
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
      <CstmMultiLine title="Share Your Feedback" />
      <CstmButton
        title="Send Feedback"
        onPress={() => console.log('Sent the Feedback')}
      />
    </View>
  );
};

export default SendFeedbackScreen;
