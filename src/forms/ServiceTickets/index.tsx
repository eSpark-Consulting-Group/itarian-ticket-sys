import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Platform, UIManager, Linking} from 'react-native';
import {State, useHookstate} from '@hookstate/core';
import {TabView, SceneMap} from 'react-native-tab-view';

import {
  ModalHeader,
  ModalView,
  RoundedIcon,
  CstmTabBar,
  FloatButton,
} from '../../components';
import {STicketsAdditionalButtons} from '../../constants/ButtonsList';
import {
  contactNameList,
  templateList,
} from '../../constants/SelectionList';
import {globalState} from '../../stores/globalAppState';
import {AdditionalButtons, SelectFields} from '../../types';
import {redirectToMap} from '../../utils/helperFunctions';
import Details from './Details';
import Notes from './Notes';
import Overview from './Overview';
import { companyStore } from '../../stores/companyStore';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = ({navigation, route}: any) => {
  const companies: any = useHookstate(companyStore.companies)?.get()
  const [actionButtons, setActionButtons] = useState<AdditionalButtons[]>(
    STicketsAdditionalButtons,
  );
  const [companyContact, setCompanyContact] = useState<any>({
    contact: contactNameList[0],
    company: companies[0],
  });
  const dNavName: State<string> = useHookstate(
    globalState.defaultnNavigationName,
  );
  const [defaultNav, setdefaultNav] = useState(dNavName.get());

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => {
      navigation.navigate('Stack2', {
        screen: 'CstmItemSelector',
        params: {
          ...route?.params,
          from: 'Signature',
          data: templateList,
          selected: null,
          stack: 'Stack3',
          title: route?.params?.title,
          headerTitle: 'Signoff template',
        },
      });
    };
    tempArr[1].onPress = () => {
      navigation.navigate('Stack2', {
        screen: 'AddResource',
      });
    };
    tempArr[2].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewTicket',
      });
    };
    tempArr[3].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewExpenseReport',
      });
    };
    tempArr[4].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'NewTimeSheet',
        params: {
          from: 'ServiceTickets',
          chargeCode: route?.params?.title,
        },
      });
    };
    setActionButtons(tempArr);
  };

  useEffect(() => {
    if (route?.params?.companyContact) {
      setCompanyContact({...route.params?.companyContact});
    }
  }, [route?.params]);

  useEffect(() => {
    updatePress();
    navigation.setParams({
      ...route?.params,
      companyContact: companyContact,
    });
  }, []);

  return (
    <ModalView>
      <ModalHeader
        icon="office-building-marker-outline"
        title={companyContact.company?.name}
        subTitle={companyContact?.contact?.name}
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
