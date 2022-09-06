import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {StyleSheet, Platform, UIManager} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import {ModalView, CstmTabBar, FloatButton} from '../../../../components';
import { ActivityAdditionalButtons } from '../../../../constants/ButtonsList';
import { AdditionalButtons } from '../../../../types';
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
  const navigation: any = useNavigation()
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Overview'},
    {key: 'second', title: 'Details'},
  ]);
  const [actionButtons, setActionButtons] = React.useState<AdditionalButtons[]>(
    ActivityAdditionalButtons,
  );

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewExpenseReport',
      });
    };
    tempArr[1].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewTimeSheet',
      });
    };
    setActionButtons(tempArr);
  };

  useEffect(() => updatePress(), [])
  return (
    <>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => <CstmTabBar {...props} />}
      />

      <FloatButton
        AdditionalButtons={actionButtons}
      />
    </>
  );
}
