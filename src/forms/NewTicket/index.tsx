import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import {ModalHeader, ModalView, SingleLineField} from '../../components';
import {MultiLineField} from '../../components/FormFields';

export default function NewTicket() {
  const {colors, dark} = useTheme();

  return (
    <ModalView>
      <ModalHeader
        title="Acme Company Ltd"
        subTitle="63 Elm Street, Tampa Bay, FL 023912"
        icon="office-building-marker-outline"
        disabled={false}
        onPress={() => console.log('Press hoa')}
        right={
          <MCI
            name={'chevron-right'}
            size={30}
            color={colors.text}
            style={{opacity: 0.6}}
          />
        }
      />
      <SingleLineField
        title="Tim Smith"
        leftIcon="account"
        rightIcon="chevron-right"
      />
      <MultiLineField title="Summary" />
      <SingleLineField
        title="Help Desk"
        subTitle="Service Board"
        rightIcon="chevron-right"
      />
      <SingleLineField
        title="New"
        subTitle="Status"
        rightIcon="chevron-right"
      />
      <SingleLineField title="Add Resource" rightIcon="chevron-right" />
      <SingleLineField
        title="Add Note"
        rightIconRound="file-plus-outline"
        roundedIconEnable={true}
        onRoundedIconPress={() => console.log('pRessed')}
      />
    </ModalView>
  );
}

const styles = StyleSheet.create({});
