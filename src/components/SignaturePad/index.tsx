import {Theme, useIsFocused, useTheme} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import SignatureScreen from 'react-native-signature-canvas';
import ModalView from '../ModalView';
import { View } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH, WINDOW_HEIGHT } from '../../constants';
import CstmButton from '../CstmButton';
export const SignaturePad = ({route, navigation}: any) => {
  const ref = useRef<any>(null);
  const {colors}: Theme = useTheme();
  const isFouced = useIsFocused();

  useEffect(() => {
    navigation.setParams({
      ...route.params,
      onCheck:  () =>  {
        ref?.current?.readSignature();
      }
    });
  }, [isFouced])
  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature: any) => {
    navigation?.navigate('Stack3', {
      screen: 'Signature',
      params: {
        image: signature,
      },
    });
  };

  return (
    <ModalView>
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <SignatureScreen
          ref={ref}
          onOK={handleOK}
          overlayHeight={600}
          autoClear={true}
          webStyle={`
          body {
            background-color: ${colors.background};
          }

          .m-signature-pad--footer
          .description {
            color: ${colors.text};
            text-align: left;
            font-size: 1.2em;
            margin-top: 0.8em;
            left: 10;
          }

          .m-signature-pad--footer
          .button {
            background-color: ${colors.primary};
            color: #fff;
          }
          
          .m-signature-pad--footer
          .button.save {
            display: none;
          }
          
          .m-signature-pad--footer {
            display: flex;
           
            height: 50px;
            width: ${SCREEN_WIDTH}px;
            flex-direction: row-reverse;
          }

          .m-signature-pad--footer
          .button.clear {
            right: 0;
          }

          .m-signature-pad {
            height: ${WINDOW_HEIGHT- 170}px;
          }
          `}
          descriptionText={`Please Tap Clear if you need to make corrections. Once approved, \n This Signature cannot be modified. You may, however, add more`}
        />
      </View>
    </ModalView>
  );
};
