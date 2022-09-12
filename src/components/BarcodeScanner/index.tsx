import React, {useState} from 'react';
import {Dimensions, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const BarcodeScanner = ({navigation, route}: any) => {
  const [show, setShow] = useState(false);

  return (
    <QRCodeScanner
      onRead={e => {
        navigation.navigate(route.params.stack, {
          screen: route.params.from,
          params: {
            data: e.data,
          },
        });
      }}
      flashMode={RNCamera.Constants.FlashMode.torch}
      showMarker
      vibrate
      containerStyle={{flex: 1, justifyContent: 'space-between'}}
      topViewStyle={{
        height: Dimensions.get('window').height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
      }}
      bottomViewStyle={{
        height: Dimensions.get('window').height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
      }}
      topContent={
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#777',
            padding: 10,
          }}>
          Scan Barcode/QR Code
        </Text>
      }
      bottomContent={
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 21,
              color: 'rgb(0,122,255)',
            }}>
            Stop Scanning
          </Text>
        </TouchableOpacity>
      }
    />
  );
};

export default BarcodeScanner;
