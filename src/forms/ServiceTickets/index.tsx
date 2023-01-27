import React, { useEffect, useState } from 'react';
import { Platform, UIManager, Alert } from 'react-native';
import { State, useHookstate } from '@hookstate/core';

import { ModalView, FloatButton, Loader, CstmTabBar } from '../../components';
import { STicketsAdditionalButtons } from '../../constants/ButtonsList';
import { contactNameList } from '../../constants/SelectionList';
import { AdditionalButtons } from '../../types';
import { companyStore } from '../../stores/companyStore';
import Overview from './Overview';
import { deleteTicket } from '../../screens/Agenda/utils/functions';
import { globalState } from '../../stores/globalAppState';
import { TabView, SceneMap } from 'react-native-tab-view';
import Threads from './Threads';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ServiceTickets = ({ navigation, route }: any) => {
  const [index, setIndex] = React.useState(0);

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
  const [loader, setLoader] = useState(false);

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
      setCompanyContact({ ...route.params?.companyContact });
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
    setLoader(true);
    deleteTicket(id)
      .then(res => {
        setLoader(false);
        if (res?.status) {
          navigation?.goBack();
        }
      })
      .catch(err => {
        console.log('delete Tickets failed', err);
        setLoader(false);
      });
  };

  return (
    <ModalView>
      <Loader isShow={loader} />
      <TabComp onChangeCurrentIndex={setIndex} />
      {index == 0 ? (
        <FloatButton
          icon="delete"
          onPress={() => {
            Alert.alert(
              'Delete Ticket?',
              'Are you sure you want to delete this ticket permanently',
              [
                {
                  text: 'Yes',
                  style: 'default',
                  onPress: () =>
                    deleteTicketFunc(route?.params?.ticket_info?.data?.id),
                },
                {
                  text: 'No',
                  style: 'cancel',
                  onPress: () => console.log('Pressed Cancel on Delete'),
                },
              ],
            );
          }}
        />
      ) : (
        <FloatButton
            onPress={() => {
              navigation.navigate('Stack2', {
                screen: 'CreateThread',
                params: {
                  ticketDetails: route?.params?.ticket_info?.data
                },
              });
            }}
        />
      )}
    </ModalView>
  );
};

const renderScene = SceneMap({
  first: Overview,
  second: Threads,
});

function TabComp({ onChangeCurrentIndex = (e: number) => {} }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Overview' },
    { key: 'second', title: 'Threads' },
  ]);

  useEffect(() => {
    console.log('Current index index', index);
    onChangeCurrentIndex(index);
  }, [index]);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={props => <CstmTabBar {...props} />}
    />
  );
}

export default ServiceTickets;
