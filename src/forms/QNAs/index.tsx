import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  CstmMultiLine,
  ModalField,
  ModalHeader,
  ModalView,
  OutlineBtn,
  SimpleLoader,
} from '../../components';
import {WINDOW_WIDTH} from '../../constants';
import {SingleLineField} from '../../components/FormFields';
import {NoteTypes} from '../../constants/SampleArrays';
import {NotesType, QNATypes, SelectFields} from '../../types';

type Item = {
  text: string;
  highlight: boolean;
};

export default function QNAs({route, navigation}: any) {
  const {colors, dark} = useTheme();
  const [noteTypeList, setNoteTypeList] = useState<QNATypes[]>([]);
  const [currChkInd, setCurrChkInd] = useState<number | any>(0);
  const [loader, setLoader] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    setNoteTypeList(route?.params?.data);
    setLoader(false);
  }, [route?.params]);

  // const handleOnChangeAns = (val: string) => {

  // }

  // useEffect(() => {
  //   navigation?.setParams({
  //     ...route?.params,
  //     notes: notes,
  //     type: noteTypeList[currChkInd]?.name,
  //     selected: null,
  //   });
  // }, [notes]);

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
        {/* <OutlineBtn
          key={index}
          text={item.text}
          widthLength={WINDOW_WIDTH * (noteTypeList?.length > 3 ? 0.27 : 0.312)}
          // onPress={() => handleType(item, index)}
          onPress={() => setCurrChkInd(index)}
          border
          backColor={colors.card}
          textColor={colors.text}
          highlight={index == currChkInd ? true : false}
        /> */}
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
          {/* <ModalHeader empty>
            <View>
              <ScrollView showsHorizontalScrollIndicator={false}>
                {noteTypeList.map(renderNoteTypes)}
              </ScrollView>
            </View>
          </ModalHeader> */}
        </>
      )}
      {loader && <SimpleLoader />}
    </ModalView>
  );
}

const styles = StyleSheet.create({});
