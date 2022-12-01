import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Images from '../../assets/Images';
import {ModalView, SingleLineField} from '../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';

// @ts-ignore
import Pinchable from 'react-native-pinchable';

export const Signature = ({navigation, route}: any) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (route?.params?.image) {
      setImage(route?.params?.image);
    }
  }, [route]);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <SingleLineField
          subTitle={`This is your .PDF Preview. \nPinch to zoom in/out`}
          title={image ? '1 Signature Collected' : 'Tap to Collect signature.'}
          rightIconRound="file-document-edit"
          onRoundedIconPress={() => {
            navigation?.navigate('Stack3', {
              screen: 'SignaturePad',
            });
          }}
          roundedIconEnable
          enable={false}
        />
      </View>
    );
  };

  return (
    <ModalView>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Pinchable>
          <Image
            source={Images.template}
            style={styles.templateStyle}
            resizeMode="contain"
          />
        </Pinchable>
        {renderFooter()}
      </ScrollView>
    </ModalView>
  );
};

const styles = StyleSheet.create({
  templateStyle: {height: '90%', width: SCREEN_WIDTH},
  footer: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
  },
});
