import React from 'react';
import {StyleSheet, Text, View, Platform, UIManager} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import {
  ModalHeader,
  ModalView,
  RoundedIcon,
  CstmTabBar,
} from '../../../../components';
import Details from './Details';
import Overview from './Overview';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  return (
    <ModalView>
      <TabComp />
    </ModalView>
  );
};

export default App;

const renderScene = SceneMap({
  first: Overview,
  second: Details,
});

function TabComp() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Overview'},
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
