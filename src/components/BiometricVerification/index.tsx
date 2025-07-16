import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const BiometricVerification = ({
  onAuthenticate,
  onCancel,
}: {
  onCancel: () => void;
  onAuthenticate: () => void;
}) => {
  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    const { available, biometryType } = await rnBiometrics.isSensorAvailable();
    if (!available) {
      Alert.alert('Biometric not available');
      onCancel();
      return;
    }

    rnBiometrics
      .simplePrompt({ promptMessage: 'Log in with Biometrics' })
      .then(resultObject => {
        const { success } = resultObject;
        if (success) {
          onAuthenticate();
        } else {
          onCancel();
        }
      })
      .catch(() => {
        Alert.alert('Authentication failed or cancelled');
        onCancel();
      });
  };

  return null;
};

export default BiometricVerification;
