import React, {useRef} from 'react';
import SignatureScreen from 'react-native-signature-canvas';
import ModalView from '../ModalView';

export const SignaturePad = ({route, navigation}: any) => {
  const ref = useRef(null);

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
      <SignatureScreen
        style={{backgroundColor: 'red'}}
        ref={ref}
        onOK={handleOK}
        autoClear={true}
        descriptionText={`Please Tap Clear if you need to make corrections. Once approved, \n This Signature cannot be modified. You may, however, add more`}
      />
    </ModalView>
  );
};
