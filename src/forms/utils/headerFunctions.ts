//Function for My Status screen header's left button

const backStatus = (navigation: any) => {
  // navigation.navigate({
  //   name: 'Profile',
  //   params: {status: s},
  //   merge: true,
  // });
  navigation.goBack();
};

//Function for My Status screen header's right button

const saveStatus = (navigation: any, route: any) => {
  // setPrevVal(switchVal);
  // currStatusVal.set(switchVal);
  // navigation.navigate({
  //   name: 'Profile',
  //   params: {status: switchVal},
  //   merge: true,
  // });
  // if (switchVal == false) {
  //   setCheckedIndex(null);
  //   setCurrChkInd(null);
  //   setTimeDur('--');
  //   setDateDur('--');
  // }
  // console.log('Profile', route.params.status);

  navigation.navigate({
    name: 'Profile',
    params: {status: route.params.status},
    merge: true,
  });
};

//Function for Gone To Screen header's right button

const saveGoneTo = (navigation: any) => {
  navigation.goBack();
};

//Function for Gone To Screen header's left button

const backGoneTo = (navigation: any) => {
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
        ...route?.params
    }
})
}

export {backStatus, saveStatus, saveGoneTo, backGoneTo, onSave};
