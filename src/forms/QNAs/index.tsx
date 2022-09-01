import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {ModalView, SimpleLoader} from '../../components';
import {SingleLineField} from '../../components/FormFields';
import {QNATypes} from '../../types';

export default function QNAs({route}: any) {
  const [noteTypeList, setNoteTypeList] = useState<QNATypes[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    setNoteTypeList(route?.params?.data);
    setLoader(false);
  }, [route?.params]);

  const renderNoteTypes = (item: QNATypes, index: number) => {
    return (
      <View key={index}>
        <SingleLineField title={'Q: ' + item.ques} enable={false} />
        <SingleLineField
          mode="multiline"
          onChangeText={setNotes}
          title={item.ans}
          placeholder="Type your Answer"
          inputable
        />
      </View>
    );
  };

  return (
    <ModalView>
      {noteTypeList?.length > 0 && (
        <>
          <ScrollView showsHorizontalScrollIndicator={false}>
            {noteTypeList.map(renderNoteTypes)}
          </ScrollView>
        </>
      )}
      {loader && <SimpleLoader />}
    </ModalView>
  );
}
