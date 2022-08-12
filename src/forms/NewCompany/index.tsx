import {View, Text, TextInput} from 'react-native';
import React from 'react';

const NewCompany = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          width: '90%',
          height: 65,
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <Text>Company Name</Text>
        <TextInput style={{borderWidth: 2, borderRadius: 5, height: 40}} />
      </View>
    </View>
  );
};

export default NewCompany;
