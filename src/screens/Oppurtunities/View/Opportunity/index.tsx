import {State, useHookstate} from '@hookstate/core';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  UIManager,
  Linking,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import {
  ModalHeader,
  ModalView,
  RoundedIcon,
  CstmTabBar,
} from '../../../../components';
import {globalState} from '../../../../stores/globalAppState';
import {redirectToMap} from '../../../../utils/helperFunctions';
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
  const dNavName: State<string> = useHookstate(
    globalState.defaultnNavigationName,
  );
  const [defaultNav, setdefaultNav] = useState(dNavName.get());
  return (
    <ModalView>
      <ModalHeader
        icon="office-building-marker-outline"
        title="Acme Company"
        subTitle="John Doe"
        right={
          <>
            <RoundedIcon
              icon="phone"
              onPress={() => Linking.openURL(`tel:090078601`)}
            />
            <View style={styles.adjuster} />
            <RoundedIcon
              icon="map-marker-outline"
              onPress={() => redirectToMap(34.923264, -120.429214, defaultNav)}
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
