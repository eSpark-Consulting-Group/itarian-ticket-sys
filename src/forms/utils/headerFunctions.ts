//Function for My Status screen header's right button

const saveStatus = (navigation: any, route: any, activeStatus: any) => {
  activeStatus?.currentStatus.set(route.params.status);
  activeStatus?.currentGoneTo.set(route.params.goneTo);
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
  navigation.navigate(route?.params?.stack, {
    screen: route?.params?.from,
    params: {
      title: route?.params?.title,
      selected: route?.params?.selected,
      item: route?.params?.item,
      ...route?.params,
    },
  });
};

export {saveStatus, goBack, onSave};
