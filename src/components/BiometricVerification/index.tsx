import React, {Component, useEffect, useState} from 'react';
import PropTypes, {any} from 'prop-types';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import styles from './style';

const BiometricVerification = ({
  onAuthenticate,
}: {
  onAuthenticate: () => void;
}) => {
  const [errorMessageLegacy, setErrorMessageLegacy] = useState(undefined);
  const [biometricLegacy, setBiometricLegacy] = useState(undefined);

  useEffect(() => {
    if (requiresLegacyAuthentication()) {
      authLegacy();
    } else {
      authCurrent();
    }
  }, []);

  const requiresLegacyAuthentication = () => {
    return Platform.Version < 23;
  };

  const authCurrent = () => {
    FingerprintScanner.authenticate({title: 'Log in with Biometrics'})
      .then(() => {
        onAuthenticate();
      })
      .catch(error => {
        console.log('Authentication error is => ', error);
      });
  };

  const authLegacy = () => {
    FingerprintScanner.authenticate({
      onAttempt: handleAuthenticationAttemptedLegacy,
    })
      .then(() => {
        // this.props.handlePopupDismissedLegacy();
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch(error => {
        setBiometricLegacy(error.message);
        setErrorMessageLegacy(error.biometric);
        // this.description.shake();
      });
  };

  const handleAuthenticationAttemptedLegacy = (error: any) => {
    setErrorMessageLegacy(error.message);
    // this.description.shake();
  };

  const renderLegacy = () => {
    return (
      <View style={styles.container}>
        {/* <View style={[styles.contentContainer, style]}>
          <Image
            style={styles.logo}
            source={require('./assets/finger_print.png')}
          />

          <Text style={styles.heading}>Biometric{'\n'}Authentication</Text>
          <ShakingText
            // ref={(instance) => { this.description = instance; }}
            style={styles.description(!!errorMessageLegacy)}>
            {errorMessageLegacy ||
              `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
          </ShakingText>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePopupDismissedLegacy}>
            <Text style={styles.buttonText}>BACK TO MAIN</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  if (requiresLegacyAuthentication()) {
    return renderLegacy();
  }

  // current API UI provided by native BiometricPrompt
  return null;
};

export default BiometricVerification;
