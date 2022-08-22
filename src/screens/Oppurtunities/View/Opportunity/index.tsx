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
import Notes from './Notes';
import Overview from './Overview';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
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
              icon="map-marker-outline"
              onPress={() => console.log('Pressed')}
            />
          </>
        }
      />
      <TabComp />
    </ModalView>
  );
}

const renderScene = SceneMap({
  first: Overview,
  second: Notes,
  third: Details,
});

function TabComp() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Overview'},
    {key: 'second', title: 'Notes'},
    {key: 'third', title: 'Details'},
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
