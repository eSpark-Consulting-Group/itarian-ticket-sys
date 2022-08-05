import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  ModalHeader,
  ModalView,
  ModalField,
  RoundedIcon,
} from '../../components';

const App = () => {
  return (
    <ModalView>
      <ModalHeader
        icon="office-building-marker-outline"
        title="Acme Company"
        subTitle="John Doe"
        right={
          <>
            <RoundedIcon icon="phone" onPress={() => console.log('Pressed')} />
            <View style={styles.adjuster} />
            <RoundedIcon
              icon="pin-outline"
              onPress={() => console.log('Pressed')}
            />
          </>
        }
      />
    </ModalView>
  );
};

export default App;

const styles = StyleSheet.create({
  adjuster: {
    width: 18,
  },
});
