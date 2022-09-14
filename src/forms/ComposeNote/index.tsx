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
// import {NoteTypes_DIR} from '../../constants/SampleArrays';
import {NotesAdditionalButtons} from '../../constants/ButtonsList';
import {AdditionalButtons, NoteTypes} from '../../types';
import {stNotesList} from '../../constants/SelectionList';

export default function ComposeNote({route, navigation}: any) {
  const {colors, dark} = useTheme();
  const [noteTypeList, setNoteTypeList] = useState<NoteTypes[]>([]);
  const [currChkInd, setCurrChkInd] = useState<number | any>(0);
  const [loader, setLoader] = useState<boolean>(true);
  const [stNotes, setStNotes] = useState<boolean>(false);
  const [selectedStNote, setSelectedStNote] = useState(stNotesList[0]);
  const [notes, setNotes] = useState<string>('');
  const [actionButtons, setActionButtons] = useState<AdditionalButtons[]>(
    NotesAdditionalButtons,
  );

  useEffect(() => {
    setNoteTypeList(route?.params?.data);
    setLoader(false);
  }, []);

  useEffect(() => {
    setSelectedStNote(route?.params?.selected);
    setNotes(route?.params?.selected?.name);
    console.log('Received Params', route?.params);
  }, [route?.params?.selected]);

  const updatePress = () => {
    let tempArr = [...actionButtons];
    tempArr[0].onPress = () => setStNotes(true);
    tempArr[1].onPress = () => {
      navigation.navigate('Stack1', {
        screen: 'AddMiscSchedule',
        params: {from: 'agenda'},
      });
    };
    setActionButtons(tempArr);
  };

  const handlePress = () => {
    navigation.navigate('Stack2', {
      screen: 'CstmItemSelector',
      params: {
        ...route?.params,
        from: 'ComposeNote',
        item: stNotesList[0].id,
        data: stNotesList,
        selected: selectedStNote,
        stack: 'Stack2',
        headerTitle: 'Standard Notes',
      },
    });
  };

  useEffect(() => {
    navigation?.setParams({
      ...route?.params,
      notes: notes,
      type: noteTypeList[currChkInd]?.text,
      from: 'ComposeNote',
      stack: 'Stack1',
    });
  }, [notes]);

  useEffect(() => {
    updatePress();
  }, []);

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
            onChangeText={e => setNotes(e)}
            subTitle="Compose Note"
            title={notes}
            inputable
          />
          {stNotes && (
            <SingleLineField
              title={'Select Standard Note'}
              rightIcon={'chevron-right'}
              onPress={handlePress}
            />
          )}
        </>
      )}
      {loader && <SimpleLoader />}
      <FloatButton AdditionalButtons={actionButtons} />
    </ModalView>
  );
}
