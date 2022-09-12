import React, {useRef, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import SignatureScreen from 'react-native-signature-canvas';
import Images from '../../assets/images';
import {ModalView, SingleLineField} from '../../components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
// @ts-ignore
import Pinchable from 'react-native-pinchable';

export const Signature = () => {
  const ref = useRef(null);
  const [image, setImage] = useState(null);
  const [renderSignature, setRenderSignature] = useState(false);

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature: any) => {
    setImage(signature);
    setRenderSignature(false);
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <SingleLineField
          subTitle={`This is your .PDF Preview. \nPinch to zoom in/out`}
          title={image ? '1 Signature Collected' : 'Tap to Collect signature.'}
          rightIconRound="file-document-edit"
          onRoundedIconPress={() => setRenderSignature(true)}
          roundedIconEnable
        />
      </View>
    );
  };

  return (
    <ModalView>
      {!renderSignature && (
        <ScrollView contentContainerStyle={{flex: 1}}>
          <Pinchable>
            <Image
              source={Images.template}
              style={styles.templateStyle}
              resizeMode="contain"
            />
          </Pinchable>
          {renderFooter()}
          {image && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Signature</Text>
              <Image source={{uri: image}} style={{height: 50, width: 50}} />
            </View>
          )}
        </ScrollView>
      )}
      {renderSignature && (
        <SignatureScreen
          style={{backgroundColor: 'red'}}
          ref={ref}
          onOK={handleOK}
          autoClear={true}
          descriptionText={`Please Tap Clear if you need to make corrections. Once approved, \n This Signature cannot be modified. You may, however, add more`}
        />
      )}
    </ModalView>
  );
};

const styles = StyleSheet.create({
  templateStyle: {height: '80%', width: SCREEN_WIDTH},
  footer: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
  },
});

