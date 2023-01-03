import { useRoute } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Platform, UIManager} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import {ModalHeader, ModalView, CstmTabBar} from '../../../../components';
import Communications from './Communications';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const routes: any = useRoute()
  const contactDetails = routes?.params?.contactDetails
  return (
    <ModalView>
      <ModalHeader
        title={contactDetails?.user_name}
        subTitle={contactDetails?.company_name || "N/A"}
        subIcon="office-building-marker-outline"
      />
      <Communications />
    </ModalView>
  );
}

const styles = StyleSheet.create({
  adjuster: {
    width: 18,
  },
});
