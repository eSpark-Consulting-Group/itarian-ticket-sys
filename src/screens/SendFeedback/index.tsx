import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import styles from './style';
import {Theme} from '../../theme/colors';
import {CstmDropDown} from '../../components';

const SendFeedbackScreen = () => {
  const {colors, dark}: Theme = useTheme();

  const [currIndex, setCurrIndex] = useState(0);

  let ideaData = [
    'Service',
    'Support',
    '24/7 Response Time',
    'Professionalism',
    'Ease of Access',
  ];

  return (
    <View style={styles.container}>
      <CstmDropDown dataSource={ideaData} />
      <CstmDropDown dataSource={ideaData} />
      <CstmDropDown dataSource={ideaData} />
    </View>
  );
};

export default SendFeedbackScreen;
