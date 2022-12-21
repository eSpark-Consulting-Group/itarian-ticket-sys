import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Platform, UIManager, Linking} from 'react-native';
import {State, useHookstate} from '@hookstate/core';

import {
  ModalHeader,
  ModalView,
  RoundedIcon,
  FloatButton,
} from '../../components';
import {STicketsAdditionalButtons} from '../../constants/ButtonsList';
import {contactNameList} from '../../constants/SelectionList';
import {globalState} from '../../stores/globalAppState';
import {AdditionalButtons} from '../../types';
import {redirectToMap} from '../../utils/helperFunctions';
import {companyStore} from '../../stores/companyStore';
import Overview from './Overview';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = ({navigation, route}: any) => {
  const companies: any = useHookstate(companyStore.companies)?.get();
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
      navigation.navigate('Stack1', {
        screen: 'NewTicket',
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
      {/* <ModalHeader
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
      /> */}
      <Overview ticketDetails={route?.params?.ticket_info?.data} />
      <FloatButton AdditionalButtons={actionButtons} />
    </ModalView>
  );
};

export default App;

const styles = StyleSheet.create({
  adjuster: {
    width: 18,
  },
});
