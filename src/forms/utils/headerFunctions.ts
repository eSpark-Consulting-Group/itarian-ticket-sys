//Function for My Status screen header's right button
import Images from '../../assets/images';
import {noteList} from '../../constants/SampleArrays';

const saveStatus = (navigation: any, route: any, activeStatus: any) => {
  console.log('route.params', route?.params);
  if (route?.params) {
    activeStatus?.currentStatus.set(route.params?.status);
    activeStatus?.currentGoneTo.set({...route.params?.goneTo});
  }
  navigation.navigate({
    name: 'Profile',
    params: {status: route.params.status},
    merge: true,
  });
};

//Function for Gone To Screen header's left button

const goBack = (navigation: any) => {
  navigation.goBack();
};

// Function for Save ItemSelector Value
const onSave = (navigation: any, route: any) => {
  if (route?.params?.notes) {
    noteList.push({
      id: noteList?.length + 1,
      img: Images.AvatarHolder,
      title: `Template ${noteList?.length + 1}`,
      time: '12:19 AM',
      date: '19 Nov, 2021',
      note: route?.params?.notes,
      type: route?.params?.type,
    });
  }

  if (route?.params?.stack == 'Draw') {
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

export {saveStatus, goBack, onSave};
