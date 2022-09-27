import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useHookstate, State} from '@hookstate/core';

import {RoundedIcon, SingleLineField} from '../../components';
import {CompanySites, ContactList, SelectFields} from '../../types';
import {redirectToMap} from '../../utils/helperFunctions';
import {globalState} from '../../stores/globalAppState';
import {ComapanySites,} from '../../constants/SampleArrays';

interface Item {
  headerTitle?: string;
  title: string;
  subTitle?: string;
  enable?: boolean;
  rightIcon?: string;
  titleWidth?: number;
  list?: SelectFields[];
  selectedItem?: SelectFields;
  leftIcon?: string;
  searchable?: boolean;
  rightChild?: React.ReactNode;
  contacts?: ContactList[] | null | undefined;
}

const Sites = () => {
  const dNavName: State<string> = useHookstate(
    globalState.defaultnNavigationName,
  );
  const [defaultNav, setdefaultNav] = useState(dNavName.get());
  const [Ds, setDs] = useState<CompanySites[]>(ComapanySites);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}>
      {Ds?.map((value, key) => {
          return (
            <SingleLineField
              key={key}
              title={value?.company_name || ''}
              subTitle={value?.type}
              rightChild={<RoundedIcon
                icon="map-marker-outline"
                onPress={() => redirectToMap(34.923264, -120.429214, defaultNav)}
              />}
              enable={false}
            />
          );
        }
      )}
    </ScrollView>
  );
};

export default Sites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  priorityBox: {
    backgroundColor: 'yellow',
    borderWidth: 1,
    height: 10,
    width: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.8,
  },
  subTitle: {
    opacity: 0.6,
  },
});
