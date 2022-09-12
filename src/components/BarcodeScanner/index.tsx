import React, {useState} from 'react';
import {Dimensions, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
      containerStyle={styles.mainContainer}
      topViewStyle={styles.infoView}
      bottomViewStyle={styles.infoView}
      topContent={<Text style={styles.headerText}>Scan Barcode/QR Code</Text>}
      bottomContent={
        <TouchableOpacity
          style={styles.footerContainer}
          onPress={() => navigation.goBack()}>
          <Text style={styles.footerText}>Stop Scanning</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {justifyContent: 'space-between'},
  infoView: {
    flex: 0,
    height: Dimensions.get('window').height * 0.1,
    backgroundColor: 'black',
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#eee',
    paddingBottom: 10,
  },

  footerContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgb(0,122,255)',
  },

  footerText: {
    fontSize: 20,
    color: '#eee',
  },
});

export default BarcodeScanner;
