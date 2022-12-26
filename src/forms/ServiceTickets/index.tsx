import React, {useEffect, useState} from 'react';
import {Platform, UIManager} from 'react-native';
import {useHookstate} from '@hookstate/core';

import {ModalView, FloatButton} from '../../components';
import {STicketsAdditionalButtons} from '../../constants/ButtonsList';
import {contactNameList} from '../../constants/SelectionList';
import {AdditionalButtons} from '../../types';
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
      <Overview ticketDetails={route?.params?.ticket_info?.data} />
      <FloatButton AdditionalButtons={actionButtons} />
    </ModalView>
  );
};

export default App;
