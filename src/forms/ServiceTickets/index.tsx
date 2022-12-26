import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Platform, UIManager, Linking, Alert} from 'react-native';
import {State, useHookstate} from '@hookstate/core';

import {
  ModalHeader,
  ModalView,
  RoundedIcon,
  FloatButton,
  Loader,
} from '../../components';
import {STicketsAdditionalButtons} from '../../constants/ButtonsList';
import {contactNameList} from '../../constants/SelectionList';
import {globalState} from '../../stores/globalAppState';
import {AdditionalButtons} from '../../types';
import {redirectToMap} from '../../utils/helperFunctions';
import {companyStore} from '../../stores/companyStore';
import Overview from './Overview';
import { deleteTicket } from '../../screens/Agenda/utils/functions';

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
  const [loader, setLoader] = useState(false)

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

  const deleteTicketFunc = (id: number) => {
    setLoader(true)
    deleteTicket(id)
    .then(res => {
      setLoader(false)
      if(res?.status) {
        navigation?.goBack()
      }
    })
    .catch((err) => {
      console.log("delete Tickets failed", err)
      setLoader(false)
    })
  
  }

  return (
    <ModalView>
      <Loader isShow={loader} />
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
      <FloatButton icon='delete' onPress={() => {
          Alert.alert(
            'Delete Ticket?',
            'Are you sure you want to delete this ticket permanently',
            [
              {
                text: 'Yes',
                style: 'default',
                onPress: () => deleteTicketFunc(route?.params?.ticket_info?.data?.id),
              },
              {
                text: 'No',
                style: 'cancel',
                onPress: () => console.log('Pressed Cancel on Delete'),
              },
            ],
          );
      }}/> 
    </ModalView>
  );
};

export default App;

const styles = StyleSheet.create({
  adjuster: {
    width: 18,
  },
});
