import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {
  FloatButton,
  ModalHeader,
  ModalView,
  OutlineBtn,
  SimpleLoader,
} from '../../components';
import {WINDOW_WIDTH} from '../../constants';
import {SingleLineField} from '../../components/FormFields';
import {NotesAdditionalButtons} from '../../constants/SampleArrays';
import {NoteTypes} from '../../types';

export default function ComposeNote({route, navigation}: any) {
  const {colors, dark} = useTheme();
  const [noteTypeList, setNoteTypeList] = useState<NoteTypes[]>([]);
  const [currChkInd, setCurrChkInd] = useState<number | any>(0);
  const [loader, setLoader] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    setNoteTypeList(route?.params?.data);
    setLoader(false);
  }, [route?.params]);

  useEffect(() => {
    navigation?.setParams({
      ...route?.params,
      notes: notes,
      type: noteTypeList[currChkInd]?.text,
      selected: null,
    });
  }, [notes]);
  const renderNoteTypes = (item: NoteTypes, index: number) => {
    return (
      <View key={index} style={{marginHorizontal: 1}}>
        <OutlineBtn
          key={index}
          text={item.text}
          widthLength={WINDOW_WIDTH * (noteTypeList?.length > 3 ? 0.27 : 0.312)}
          onPress={() => setCurrChkInd(index)}
          border
          backColor={colors.card}
          textColor={colors.text}
          highlight={index == currChkInd ? true : false}
        />
      </View>
    );
  };

  return (
    <ModalView>
      {noteTypeList?.length > 0 && (
        <>
          <ModalHeader empty>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {noteTypeList.map(renderNoteTypes)}
              </ScrollView>
            </View>
          </ModalHeader>
          <SingleLineField
            mode="multiline"
            onChangeText={setNotes}
            subTitle="Compose Note"
            title={notes}
            inputable
          />
        </>
      )}
      {loader && <SimpleLoader />}
      <FloatButton AdditionalButtons={NotesAdditionalButtons} />
    </ModalView>
  );
}
