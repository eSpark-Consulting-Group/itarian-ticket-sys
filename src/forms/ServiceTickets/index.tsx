import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import {
  ModalHeader,
  ModalView,
  ModalField,
  RoundedIcon,
  CstmTabBar,
} from '../../components';
import {WINDOW_WIDTH} from '../../constants';
import Details from './Details';
import Notes from './Notes';
import Overview from './Overview';

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
      <View style={{height: 10}} />
      <TabComp />
    </ModalView>
  );
};

export default App;

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
