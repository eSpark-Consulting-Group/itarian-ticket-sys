import { useRoute } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, Platform, UIManager} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import {ModalHeader, ModalView, CstmTabBar} from '../../../../components';
import Communications from './Communications';
import Details from './Details';

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
      <TabComp />
    </ModalView>
  );
}

const renderScene = SceneMap({
  first: Communications,
  second: Details,
});

function TabComp() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Communications'},
    {key: 'second', title: 'Details'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={props => <CstmTabBar {...props} />}
    />
  );
}

const styles = StyleSheet.create({
  adjuster: {
    width: 18,
  },
});
