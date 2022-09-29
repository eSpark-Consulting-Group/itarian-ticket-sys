import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {Theme, useTheme} from '@react-navigation/native';
import II from 'react-native-vector-icons/Ionicons';

import styles from './style';
import Images from '../../../assets/images';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {CstmPressable} from '../../../components';

const PinScreen = () => {
  const [pin, setPin] = useState('');

  const {colors}: Theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.Logo}
          resizeMode={'contain'}
          style={styles.headerImage}
        />
      </View>
      <OTPInputView
        style={{width: '70%', height: 100, alignSelf: 'center'}}
        pinCount={5}
        code={pin} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={code => {
          setPin(code);
          console.log('code', code);
        }}
        editable={false}
        autoFocusOnLoad={false}
        codeInputFieldStyle={{
          ...styles.underlineStyleBase,
          color: colors.text,
          borderColor: colors.border,
          borderBottomWidth: 2,
          borderRadius: 5,
          height: 40,
          width: 40,
        }}
        selectionColor={colors.text}
        codeInputHighlightStyle={{
          borderColor: colors.border,
          borderRadius: 5,
          color: colors.text,
        }}
      />
      <Text style={{color: colors.text}}>Pin Screen</Text>
      <View
        style={{width: '80%', alignItems: 'center', backgroundColor: 'teal'}}>
        <View style={{...styles.row}}>
          <CstmPressable
            onPress={() => console.log('hello')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>1</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => console.log('hello')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>2</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => console.log('hello')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>3</Text>
          </CstmPressable>
        </View>
        <View style={{...styles.row}}>
          <CstmPressable
            onPress={() => console.log('hello')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>4</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => console.log('hello')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>5</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => console.log('hello')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>6</Text>
          </CstmPressable>
        </View>
        <View style={{...styles.row}}>
          <CstmPressable
            onPress={() => console.log('hello')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>7</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => console.log('hello')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>8</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => console.log('hello')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>9</Text>
          </CstmPressable>
        </View>
        <View style={{...styles.row}}>
          <CstmPressable
            onPress={() => console.log('hello')}
            android_ripple={{borderless: true}}>
            <II
              name="md-finger-print"
              size={36}
              color={colors.text}
              style={styles.icon}
            />
          </CstmPressable>
          <CstmPressable
            onPress={() => console.log('hello')}
            android_ripple={{borderless: true}}>
            <Text style={{...styles.text, color: colors.text}}>0</Text>
          </CstmPressable>
          <CstmPressable
            onPress={() => console.log('hello')}
            android_ripple={{borderless: true}}>
            <II
              name="backspace-outline"
              size={36}
              color={colors.text}
              style={styles.icon}
            />
          </CstmPressable>
        </View>
      </View>
    </View>
  );
};

export default PinScreen;
