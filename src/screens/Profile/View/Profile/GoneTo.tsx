import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ModalField, ModalView, SingleLineField} from '../../../../components';
import {GoneToFormArray} from '../../../../constants/SampleArrays';
import {Theme} from '../../../../theme/colors';
import {GONE_TO_ARRAY} from '../../../../constants';
import {Checkbox} from 'react-native-paper';

const GoneTo = ({navigation}: any) => {
  const {colors}: Theme = useTheme();
  const [currChkInd, setCurrChkInd] = useState<number | null>(null);

  return (
    <ModalView>
      {GONE_TO_ARRAY.map((item, index) => (
        <SingleLineField
          key={item.name}
          title={item.name}
          onPress={() => setCurrChkInd(index)}
          leftChild={
            <Checkbox
              status={currChkInd == index ? 'checked' : 'unchecked'}
              color={colors.primary}
              onPress={() => setCurrChkInd(index)}
            />
          }
        />
      ))}
    </ModalView>
  );
};

export default GoneTo;

const styles = StyleSheet.create({});
