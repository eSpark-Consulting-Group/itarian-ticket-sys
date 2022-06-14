import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const Splash: React.FC<{}> = () => {
  return (
    <View>
      <Text>Hello</Text>
      <ActivityIndicator size={'large'} color="#901324" />
    </View>
  );
};

export default Splash;
