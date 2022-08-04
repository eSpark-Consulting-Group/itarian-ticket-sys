import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ModalField, ModalForm} from '../components';
import {GoneToFormArray} from '../constants/SampleArrays';
import {Theme} from '../theme/colors';
import {GONE_TO_ARRAY} from '../constants';

const GoneTo = ({navigation}: any) => {
  const {colors}: Theme = useTheme();
  const [currChkInd, setCurrChkInd] = useState<number | null>(null);

  return (
    <ModalForm fieldsArray={GoneToFormArray}>
      {GONE_TO_ARRAY.map((item, index) => (
        <ModalField
          key={item.name}
          mode="inlined"
          headingLeft={item.name}
          checkBoxRight
          checkBox_Val={currChkInd == index ? 'checked' : 'unchecked'}
          onCheckPress={() => setCurrChkInd(index)}
        />
      ))}
    </ModalForm>
  );
};

export default GoneTo;

const styles = StyleSheet.create({});
