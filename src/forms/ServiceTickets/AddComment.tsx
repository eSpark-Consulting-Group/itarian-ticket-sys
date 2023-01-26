import { useHookstate } from '@hookstate/core';
import { Theme, useRoute, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import {
  CstmButton,
  CstmMultiLine,
  CstmTitleInput,
  GapView,
  Loader,
  SingleLineField,
} from '../../components';
import { TextEditor } from '../../components/TextEditor';
import { createTicketThread } from '../../screens/Agenda/utils/functions';
import { userStore } from '../../stores/userStore';
import styles from '../CreateComment/styles';

export const CreateThread = () => {
  const { colors }: Theme = useTheme();
  const route: any = useRoute();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  const user: any = useHookstate(userStore.userDetails).get();

  const onCreate = async () => {
    createTicketThread(
      {
        data: {
          type: 'ticketthreads',
          attributes: {
            subject: title,
            detail: body,
            is_internal: false,
          },
          relationships: {
            user: {
              data: {
                type: 'users',
                id: user?.id,
              },
            },
            ticket: {
              data: {
                type: 'tickets',
                id: route?.params?.ticketDetails?.id,
              },
            },
          },
        },
      },
      route?.params?.ticketDetails?.id,
    );
  };
  return (
    <>
      <Loader isShow={loading} />
      <ScrollView
        style={{
          flex: 1,
          marginTop: 10,
          paddingHorizontal: 8,
        }}>
        <SingleLineField
          title="is Internal"
          showRightSwitch
          rightSwitchVal={isInternal}
          onChangeSwitch={setIsInternal}
        />
        <CstmTitleInput title="Subject" onChangeText={setTitle} />
        <>
          <GapView mode="vertical" />
          <Text style={{ color: colors.text, opacity: 0.8 }}>Details</Text>
          <GapView mode="vertical" length={5} />
        </>
        <TextEditor onChangeText={setBody} />
      </ScrollView>
      <View>
        <CstmButton
          loader={false}
          title="Create Thread"
          onPress={() => {
            console.log(
              'title',
              title,
              'body',
              body,
              'userId',
              user?.id,
              'ticket ID',
              route?.params?.ticketDetails?.id,
            );
          }}
        />
      </View>
    </>
  );
};
