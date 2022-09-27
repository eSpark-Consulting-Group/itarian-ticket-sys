//Function for My Status screen header's right button
import {Alert} from 'react-native';
import Images from '../../assets/images';
import {noteList, stopWatchList} from '../../constants/SampleArrays';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {globalState} from '../../stores/globalAppState';

const saveStatus = (navigation: any, route: any, activeStatus: any) => {
  console.log('route.params', route?.params);
  if (route.params?.status && route.params?.backDate == '-') {
    showMessage({
      message: 'Please select Date Back',
      type: 'warning',
      icon: 'warning',
    });
  } else {
    showMessage({
      message: 'Status Updated Successfully',
      type: 'success',
      icon: 'auto',
    });
    activeStatus?.currentStatus.set(route.params?.status);
    activeStatus?.currentGoneTo.set({...route.params?.goneTo});
    activeStatus?.additionalInfo.set(route.params?.addInfo);
    activeStatus?.dateBack.set(route.params?.backDate);
    activeStatus?.timeBack.set(route.params?.backTime);
    navigation.navigate({
      name: 'Profile',
      params: {status: route.params.status},
      merge: true,
    });
  }
};

//Function for Gone To Screen header's left button

const goBack = (navigation: any) => {
  navigation.goBack();
};

// Function for Save ItemSelector Value
const onSave = (navigation: any, route: any, activeStatus?: any) => {
  console.log(
    'route.params',
    route?.params?.stack,
    'reoute?.params',
    route?.params,
  );
  if (route?.params?.notes) {
    const currDate = new Date();
    console.log('yeh Chala?', currDate.toString().slice(16, 21));
    const fullDate =
      currDate.getDate() +
      ' ' +
      currDate.toString().slice(4, 7) +
      ', ' +
      currDate.getFullYear();
    const fullTime = currDate.toString().slice(16, 21);
    noteList.push({
      id: noteList?.length + 1,
      img: Images.AvatarHolder,
      title: `Template ${noteList?.length + 1}`,
      time: route?.params?.showTime ? fullTime : '',
      date: route?.params?.showTime ? fullDate : '',
      note: route?.params?.notes,
      type: route?.params?.type,
    });
    showMessage({
      message: 'Note added Successfully',
      type: 'success',
      icon: 'auto',
    });
  }

  if (
    route?.params?.stack == 'Draw' &&
    route?.params?.from != 'SBoard' &&
    route?.params?.from != 'PBoard'
  ) {
    if (route?.params?.from == 'Agenda') {
      activeStatus?.agendaMember.set(
        JSON.parse(JSON.stringify(route.params?.selected.name)),
      );
    } else if (route?.params?.from == 'Calendar') {
      activeStatus?.calendarMember.set(
        JSON.parse(JSON.stringify(route.params?.selected.name)),
      );
    }

    navigation.navigate(route?.params?.stack, {
      title: route?.params?.title,
      selected: route?.params?.selected,
      item: route?.params?.item,
      ...route?.params,
    });
  } else {
    navigation.navigate(route?.params?.stack, {
      screen: route?.params?.from,
      params: {
        title: route?.params?.title,
        selected: route?.params?.selected,
        item: route?.params?.item,
        ...route?.params,
      },
    });
  }
};

const clearFunc = (navigation: any, route: any) => {
  navigation.navigate(route?.params?.stack, {
    screen: route?.params?.from,
    params: {
      title: route?.params?.title,
      selected: route?.params?.selected,
      item: route?.params?.item,
      filter: [],
    },
  });
};
const handleStopwatch = (params: any) => {
  const {ticket_info} = params;
  const date = new Date();
  let tempArr: any = [...stopWatchList];
  tempArr.push({
    ticket_no: ticket_info.id,
    summary: ticket_info.summary,
    created_at: date.toDateString(),
    timer: 0,
    isPlaying: false,
    show: true,
  });
  globalState.stopwatch.set(tempArr);
  console.log('hoa ==========>>', tempArr);
};

export {saveStatus, goBack, onSave, handleStopwatch, clearFunc};
