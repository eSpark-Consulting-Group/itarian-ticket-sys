import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Platform, UIManager} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import {
  ModalHeader,
  ModalView,
  RoundedIcon,
  CstmTabBar,
  FloatButton,
} from '../../components';
import {companiesList, contactsList, STicketsAdditionalButtons} from '../../constants/SampleArrays';
import {AdditionalButtons, SelectFields} from '../../types';
import Details from './Details';
import Notes from './Notes';
import Overview from './Overview';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = ({navigation, route}: any) => {
  const [actionButtons, setActionButtons] = useState<AdditionalButtons[]>(
    STicketsAdditionalButtons,
  );
  const [companyContact, setCompanyContact] = useState<any>({
    contact: contactsList[0],
    company: companiesList[0]
  })

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[3].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewExpenseReport',
      });
    };
    tempArr[2].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewTicket',
      });
    };
    setActionButtons(tempArr);
  };

  useEffect(() => {
    if(route?.params?.companyContact) {
      console.log('route?.params?.companyContact',route?.params?.companyContact);
      setCompanyContact({...route.params?.companyContact})
    }
  }, (route?.params));

  useEffect(() => {
    updatePress();
    navigation.setParams({
      ...route?.params,
      companyContact: companyContact
    });
  }, []);

  console.log("companyContact companyContact", companyContact)
  return (
    <ModalView>
      <ModalHeader
        icon="office-building-marker-outline"
        title={companyContact.company?.name}
        subTitle={companyContact?.contact?.name}
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
      <FloatButton AdditionalButtons={actionButtons} />
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
