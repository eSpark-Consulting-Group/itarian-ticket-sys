import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import II from 'react-native-vector-icons/Ionicons';
import FA from 'react-native-vector-icons/FontAwesome';
import {Theme, useTheme} from '@react-navigation/native';
import {State, useHookstate} from '@hookstate/core';

import {goBack, saveStatus} from '../utils/headerFunctions';

import STickets from '../../forms/ServiceTickets';
import Contact1 from '../../screens/Contacts/View/Contacts';
import TeamDetails from '../../screens/Teams/View/Teams';
import SlaPlanDetails from '../../screens/SlaPlans/View/SlaPlans/Details';
import Company from '../../screens/Companies/View/Company';
import NewCompany from '../../forms/NewCompany';
import MyStatus from '../../screens/Profile/View/Profile/MyStatus';
import NewTicket from '../../forms/NewTicket';
import CreatePost from '../../forms/CreatePost';
import {userStore} from '../../stores/userStore';
import {checkValidations, dataFormatter} from '../../utils/helperFunctions';
import {Post} from '../../screens';
import NewTeam from '../../forms/NewTeam';
import {addTeam, updateTeam} from '../../screens/Teams/utils/functions';
import NewSlaPlans from '../../forms/NewSlaPlans';
import {
  addSlaPlans,
  updateSlaPlan,
} from '../../screens/SlaPlans/utils/functions';
import TicketPriorityDetails from '../../screens/TicketPriorities/View/TicketPriorities/index';
import NewTicketPriorities from '../../forms/NewTicketPriorities';
import DepartmentDetails from '../../screens/Departments/View/Department/index';
import LocationDetails from '../../screens/Locations/View/Location/index';
import HelpTopicDetails from '../../screens/HelpTopic/View/HelpTopic/index';
import {
  addTicketPriorities,
  updateTicketPriorities,
} from '../../screens/TicketPriorities/utils/functions';
import {
  addDepartment,
  updateDepartment,
} from '../../screens/Departments/utils/functions';
import NewDepartment from '../../forms/NewDepartment';
import NewLocation from '../../forms/NewLocation';
import {
  addLocation,
  updateLocation,
} from '../../screens/Locations/utils/functions';
import NewHelpTopic from '../../forms/NewHelpTopic';
import {
  addHelpTopic,
  updateHelpTopic,
} from '../../screens/HelpTopic/utils/functions';
import moment from 'moment';
import {addTicket, updateTicket} from '../../screens/Agenda/utils/functions';
import {
  addOrganization,
  updateOrganization,
} from '../../screens/Companies/utils/functions';
import NewContact from '../../forms/NewUser';
import {addUser, updateUser} from '../../screens/Contacts/utils/functions';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  MyStatus: {status: boolean};
  STickets: {title: string};
  Company: {title: string};
  NewCompany: {title: string};
  NewUser: {title: string};
  Contact1: undefined;
  Activities: undefined;
  NewTicket: undefined;
  CreatePost: undefined;
  Post: {id: string};
  TeamDetails: undefined;
  SlaPlanDetails: undefined;
  TicketPriorityDetails: undefined;
  DepartmentDetails: undefined;
  LocationDetails: undefined;
  HelpTopicDetails: undefined;
  NewTeam: {title: string};
  NewSlaPlans: {title: string};
  NewTicketPriorities: {title: string};
  NewDepartment: {title: string};
  NewLocation: {title: string};
  NewHelpTopic: {title: string};
};

const StackLvl1 = ({route, navigation}: any) => {
  const {colors}: Theme = useTheme();
  const globalStates: State<any> = useHookstate(userStore);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff',
        },
        animation: 'slide_from_bottom',
      }}>
      <Stack.Screen
        name="MyStatus"
        component={MyStatus}
        initialParams={{status: false}}
        options={({navigation, route}) => ({
          title: 'My Status',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => {
            return (
              <II
                size={30}
                name="close"
                style={{right: 6}}
                color={'#fff'}
                onPress={() => goBack(navigation)}
              />
            );
          },
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => saveStatus(navigation, route, globalStates)}
            />
          ),
        })}
      />
      <Stack.Screen
        name="STickets"
        component={STickets}
        options={({route, navigation}: any) => ({
          title: route?.params?.title,
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 15}} />
              <FA
                onPress={() => {
                  const data = dataFormatter(route?.params?.data, '_');
                  const obj: any = {
                    data: {
                      id: data?.id,
                      type: 'tickets',
                      attributes: {
                        duedate:
                          data?.duedate != 'Please Select'
                            ? moment(data?.duedate).format(
                                'YYYY-MM-DD hh:mm:ss',
                              )
                            : moment().format('YYYY-MM-DD hh:mm:ss'),
                        ticket_thread: {
                          subject: data?.subject,
                          detail: data?.detail,
                        },
                      },
                      relationships: {
                        slaplan: {
                          data: {
                            type: 'slaplans',
                            id: data?.slaplan?.id,
                          },
                        },
                        user: {
                          data: {
                            type: 'users',
                            id: data?.user?.id,
                          },
                        },
                        staff: {
                          data: {
                            type: 'users',
                            id: data?.staff?.id,
                          },
                        },
                        helptopic: {
                          data: {
                            type: 'helptopics',
                            id: data?.helptopic?.id,
                          },
                        },
                        ticketpriority: {
                          data: {
                            type: 'ticketpriorities',
                            id: data?.ticketpriority?.id,
                          },
                        },
                      },
                    },
                  };
                  if (!obj?.data?.relationships?.staff?.data?.id) {
                    delete obj?.data?.relationships?.staff;
                  }
                  checkValidations(
                    navigation,
                    route,
                    globalStates,
                    updateTicket,
                    obj,
                  );
                }}
                size={30}
                name="save"
                color={'#fff'}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Company"
        component={Company}
        options={({route, navigation}: any) => ({
          title: 'Organization',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => {
                const data = dataFormatter(route?.params?.data);
                const obj = {
                  data: {
                    id: data?.id,
                    type: 'organizations',
                    attributes: {
                      name: data?.name,
                      phone_number: data?.phone_number,
                      website: data?.website,
                      address: data?.address,
                      internal_notes: data?.internal_notes,
                    },
                    relationships: {
                      mainuser: {
                        data: {
                          type: 'users',
                          id: data?.mainuser?.id,
                        },
                      },
                    },
                  },
                };

                checkValidations(
                  navigation,
                  route,
                  globalStates,
                  updateOrganization,
                  obj,
                  'Organization updated successfully',
                );
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewCompany"
        component={NewCompany}
        options={({route, navigation}: any) => ({
          title: 'New Organization',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation?.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => {
                const data = dataFormatter(route?.params?.data);
                const obj = {
                  data: {
                    type: 'organizations',
                    attributes: {
                      name: data?.name,
                      phone_number: data?.phone_number,
                      website: data?.website,
                      address: data?.address,
                      internal_notes: data?.internal_notes,
                    },
                    relationships: {
                      mainuser: {
                        data: {
                          type: 'users',
                          id: data?.mainuser?.id,
                        },
                      },
                    },
                  },
                };

                checkValidations(
                  navigation,
                  route,
                  globalStates,
                  addOrganization,
                  obj,
                  'Organization added successfully',
                );
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewUser"
        component={NewContact}
        options={({route, navigation}: any) => ({
          title: 'New User',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation?.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => {
                const data = dataFormatter(route?.params?.data);
                const obj = {
                  data: {
                    type: 'users',
                    attributes: {
                      provider_id: null,
                      email: data?.email,
                      user_name: data?.user_name,
                      last_name: data?.last_name,
                      first_name: data?.first_name,
                      role: 'user',
                      password: data?.password,
                      is_active: data?.is_active,
                      phone_number: data?.phone_number,
                    },
                  },
                };
                checkValidations(
                  navigation,
                  route,
                  globalStates,
                  addUser,
                  obj,
                  'User added successfully',
                );
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Contact1"
        component={Contact1}
        options={({route, navigation}: any) => ({
          title: 'User',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => {
                const data = dataFormatter(route?.params?.data);
                const obj = {
                  data: {
                    type: 'users',
                    id: data.id,
                    attributes: {
                      provider_id: null,
                      email: data?.email,
                      user_name: data?.user_name,
                      last_name: data?.last_name,
                      first_name: data?.first_name,
                      role: 'user',
                      password: data?.password,
                      is_active: data?.is_active,
                      phone_number: data?.phone_number,
                    },
                  },
                };
                checkValidations(
                  navigation,
                  route,
                  globalStates,
                  updateUser,
                  obj,
                  'User updated successfully',
                );
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewTicket"
        component={NewTicket}
        options={({route, navigation}: any) => ({
          title: 'New Ticket',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => {
                const data = dataFormatter(route?.params?.data, '_');
                const obj: any = {
                  data: {
                    type: 'tickets',
                    attributes: {
                      duedate:
                        data?.duedate != 'Please Select'
                          ? moment(data?.duedate).format('YYYY-MM-DD hh:mm:ss')
                          : moment().format('YYYY-MM-DD hh:mm:ss'),
                      ticket_thread: {
                        subject: data?.subject,
                        detail: data?.detail,
                      },
                    },
                    relationships: {
                      slaplan: {
                        data: {
                          type: 'slaplans',
                          id: data?.slaplan?.id,
                        },
                      },
                      user: {
                        data: {
                          type: 'users',
                          id: data?.user?.id,
                        },
                      },
                      staff: {
                        data: {
                          type: 'users',
                          id: data?.staff?.id,
                        },
                      },
                      helptopic: {
                        data: {
                          type: 'helptopics',
                          id: data?.helptopic?.id,
                        },
                      },
                      ticketpriority: {
                        data: {
                          type: 'ticketpriorities',
                          id: data?.ticketpriority?.id,
                        },
                      },
                    },
                  },
                };
                if (!obj?.data?.relationships?.staff?.data?.id) {
                  delete obj?.data?.relationships?.staff;
                }
                checkValidations(
                  navigation,
                  route,
                  globalStates,
                  addTicket,
                  obj,
                );
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={({route, navigation}) => ({
          title: 'Create Post',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="TeamDetails"
        component={TeamDetails}
        options={({route, navigation}: any) => ({
          title: 'Teams Details',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => {
                const data = dataFormatter(route?.params?.data);
                const obj = {
                  data: {
                    id: data?.id,
                    type: 'teams',
                    attributes: {
                      name: data?.TeamName,
                      status: Boolean(data?.Status),
                      admin_notes: data?.AdminNotes,
                    },
                    relationships: {
                      teamlead: {
                        data: {
                          type: 'users',
                          id: data?.TeamLead[0]?.id,
                        },
                      },
                    },
                  },
                };
                checkValidations(
                  navigation,
                  route,
                  globalStates,
                  updateTeam,
                  obj,
                  'Team updated successfully',
                );
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="SlaPlanDetails"
        component={SlaPlanDetails}
        options={({route, navigation}: any) => ({
          title: 'SlaPlan Details',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => {
            return (
              route?.params?.data?.length > 2 &&
              route?.params?.data[1]?.title != 'Default' && (
                <FA
                  size={27}
                  name="save"
                  color={'#fff'}
                  onPress={() => {
                    const data = dataFormatter(route?.params?.data, '_');
                    const obj = {
                      data: {
                        id: data?.id,
                        type: 'slaplans',
                        attributes: {
                          name: data?.name,
                          status: data?.Status,
                          grace_period: `${
                            Number(data?.grace_period) * 6
                          } Hours`,
                          admin_note: data?.admin_note,
                        },
                      },
                    };
                    checkValidations(
                      navigation,
                      route,
                      globalStates,
                      updateSlaPlan,
                      obj,
                      'SlaPlan updated successfully',
                    );
                  }}
                />
              )
            );
          },
        })}
      />
      <Stack.Screen
        name="TicketPriorityDetails"
        component={TicketPriorityDetails}
        options={({route, navigation}: any) => ({
          title: 'Ticket Priority Details',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => {
            return (
              route?.params?.data?.length > 2 &&
              route?.params?.data[1]?.title != 'Default' && (
                <FA
                  size={27}
                  name="save"
                  color={'#fff'}
                  onPress={() => {
                    const data = dataFormatter(route?.params?.data, '_');
                    const obj = {
                      data: {
                        id: data?.id,
                        type: 'ticketpriorities',
                        attributes: {
                          name: data?.name,
                          description: data?.description,
                          status: data?.Status,
                          color: data?.color,
                          is_public: data?.IsPublic,
                        },
                      },
                    };
                    checkValidations(
                      navigation,
                      route,
                      globalStates,
                      updateTicketPriorities,
                      obj,
                      'Ticket Priority updated successfully',
                    );
                  }}
                />
              )
            );
          },
        })}
      />
      <Stack.Screen
        name="DepartmentDetails"
        component={DepartmentDetails}
        options={({route, navigation}: any) => ({
          title: 'Department Details',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => {
            return (
              route?.params?.data?.length > 2 &&
              route?.params?.data[1]?.title != 'Default' && (
                <FA
                  size={27}
                  name="save"
                  color={'#fff'}
                  onPress={() => {
                    const data = dataFormatter(route?.params?.data, '_');
                    const obj = {
                      data: {
                        id: data?.id,
                        type: 'departments',
                        attributes: {
                          name: data?.name,
                          is_default: data?.IsDefault,
                          is_public: data?.IsPublic,
                        },
                        relationships: {
                          mainstaff: {
                            data: {
                              type: 'users',
                              id: data?.Manager?.id,
                            },
                          },
                          slaplan: {
                            data: {
                              type: 'slaplans',
                              id: data?.Sla_Plan?.id,
                            },
                          },
                        },
                      },
                    };
                    checkValidations(
                      navigation,
                      route,
                      globalStates,
                      updateDepartment,
                      obj,
                      'Department updated successfully',
                    );
                  }}
                />
              )
            );
          },
        })}
      />
      <Stack.Screen
        name="LocationDetails"
        component={LocationDetails}
        options={({route, navigation}: any) => ({
          title: 'Location Details',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => {
            return (
              route?.params?.data?.length > 2 &&
              route?.params?.data[1]?.title != 'Default' && (
                <FA
                  size={27}
                  name="save"
                  color={'#fff'}
                  onPress={() => {
                    const data = dataFormatter(route?.params?.data, '_');
                    const obj = {
                      data: {
                        id: data?.id,
                        type: 'locations',
                        attributes: {
                          title: data?.title,
                          country: data?.country,
                          state: data?.state,
                          phone: data?.phone,
                          city: data?.city,
                          pin_code: data?.pin_code,
                          address: data?.address,
                        },
                      },
                    };
                    checkValidations(
                      navigation,
                      route,
                      globalStates,
                      updateLocation,
                      obj,
                      'Location updated successfully',
                    );
                  }}
                />
              )
            );
          },
        })}
      />
      <Stack.Screen
        name="HelpTopicDetails"
        component={HelpTopicDetails}
        options={({route, navigation}: any) => ({
          title: 'HelpTopic Details',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => {
            return (
              route?.params?.data?.length > 2 &&
              route?.params?.data[1]?.title != 'Default' && (
                <FA
                  size={27}
                  name="save"
                  color={'#fff'}
                  onPress={() => {
                    const data = dataFormatter(route?.params?.data, '_');
                    const obj = {
                      data: {
                        type: 'helptopics',
                        id: data?.id,
                        attributes: {
                          name: data?.name,
                          parent_name: data?.parent_name?.name,
                          internal_notes: data?.internal_notes,
                          status: data?.status,
                          is_public: data?.is_public,
                        },
                        relationships: {
                          slaplan: {
                            data: {
                              type: 'slaplans',
                              id: data?.slaplan?.id,
                            },
                          },
                          staff: {
                            data: {
                              type: 'users',
                              id: data?.staff?.id,
                            },
                          },
                          ticketpriority: {
                            data: {
                              type: 'ticketpriorities',
                              id: data?.ticketpriority?.id,
                            },
                          },
                          helptopicdepartment: {
                            data: {
                              type: 'departments',
                              id: data?.helptopicdepartment?.id,
                            },
                          },
                        },
                      },
                    };
                    if (!data?.parent_name?.name) {
                      delete obj.data.attributes.parent_name;
                    }
                    checkValidations(
                      navigation,
                      route,
                      globalStates,
                      updateHelpTopic,
                      obj,
                      'HelpTopic updated successfully',
                    );
                  }}
                />
              )
            );
          },
        })}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={({route, navigation}) => ({
          title: 'View Post',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="close"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewTeam"
        component={NewTeam}
        options={({route, navigation}: any) => ({
          title: 'New Team',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => {
                const data = dataFormatter(route?.params?.data);
                const obj = {
                  data: {
                    type: 'teams',
                    attributes: {
                      name: data?.TeamName,
                      status: data?.Status,
                      admin_notes: data?.AdminNotes,
                    },
                    relationships: {
                      teamlead: {
                        data: {
                          type: 'users',
                          id: data?.TeamLead?.id,
                        },
                      },
                    },
                  },
                };
                checkValidations(navigation, route, globalStates, addTeam, obj);
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewSlaPlans"
        component={NewSlaPlans}
        options={({route, navigation}: any) => ({
          title: 'New Sla Plans',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => {
                const data = dataFormatter(route?.params?.data, '_');
                const obj = {
                  data: {
                    type: 'slaplans',
                    attributes: {
                      name: data?.name,
                      status: data?.Status,
                      grace_period: `${Number(data?.grace_period) * 6} Hours`,
                      admin_note: data?.admin_note,
                    },
                  },
                };
                checkValidations(
                  navigation,
                  route,
                  globalStates,
                  addSlaPlans,
                  obj,
                );
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewTicketPriorities"
        component={NewTicketPriorities}
        options={({route, navigation}: any) => ({
          title: 'New Ticket Priorities',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => {
                const data = dataFormatter(route?.params?.data, '_');
                const obj = {
                  data: {
                    type: 'ticketpriorities',
                    attributes: {
                      name: data?.name,
                      description: data?.description,
                      status: data?.Status,
                      color: data?.color,
                      is_public: data?.IsPublic,
                    },
                  },
                };
                checkValidations(
                  navigation,
                  route,
                  globalStates,
                  addTicketPriorities,
                  obj,
                );
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewDepartment"
        component={NewDepartment}
        options={({route, navigation}: any) => ({
          title: 'New Department',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => {
                const data = dataFormatter(route?.params?.data, '_');
                const obj = {
                  data: {
                    type: 'departments',
                    attributes: {
                      name: data?.name,
                      is_default: data?.IsDefault,
                      is_public: data?.IsPublic,
                    },
                    relationships: {
                      mainstaff: {
                        data: {
                          type: 'users',
                          id: data?.Manager?.id,
                        },
                      },
                      slaplan: {
                        data: {
                          type: 'slaplans',
                          id: data?.Sla_Plan?.id,
                        },
                      },
                    },
                  },
                };
                checkValidations(
                  navigation,
                  route,
                  globalStates,
                  addDepartment,
                  obj,
                );
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewLocation"
        component={NewLocation}
        options={({route, navigation}: any) => ({
          title: 'New Location',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => {
                const data = dataFormatter(route?.params?.data, '_');
                const obj = {
                  data: {
                    type: 'locations',
                    attributes: {
                      title: data?.title,
                      country: data?.country,
                      state: data?.state,
                      phone: data?.phone,
                      city: data?.city,
                      pin_code: data?.pin_code,
                      address: data?.address,
                    },
                  },
                };
                checkValidations(
                  navigation,
                  route,
                  globalStates,
                  addLocation,
                  obj,
                );
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewHelpTopic"
        component={NewHelpTopic}
        options={({route, navigation}: any) => ({
          title: 'New HelpTopic',
          headerStyle: {backgroundColor: colors.primary},
          headerLeft: () => (
            <II
              size={30}
              name="chevron-back"
              style={{right: 6}}
              color={'#fff'}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FA
              size={27}
              name="save"
              color={'#fff'}
              onPress={() => {
                const data = dataFormatter(route?.params?.data, '_');
                const obj = {
                  data: {
                    type: 'helptopics',
                    attributes: {
                      name: data?.name,
                      parent_name: data?.parent_name?.name,
                      internal_notes: data?.internal_notes,
                      status: data?.status,
                      is_public: data?.is_public,
                    },
                    relationships: {
                      slaplan: {
                        data: {
                          type: 'slaplans',
                          id: data?.slaplan?.id,
                        },
                      },
                      staff: {
                        data: {
                          type: 'users',
                          id: data?.staff?.id,
                        },
                      },
                      ticketpriority: {
                        data: {
                          type: 'ticketpriorities',
                          id: data?.ticketpriority?.id,
                        },
                      },
                      helptopicdepartment: {
                        data: {
                          type: 'departments',
                          id: data?.helptopicdepartment?.id,
                        },
                      },
                    },
                  },
                };
                if (!data?.parent_name?.name) {
                  delete obj.data.attributes.parent_name;
                }
                checkValidations(
                  navigation,
                  route,
                  globalStates,
                  addHelpTopic,
                  obj,
                );
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default StackLvl1;
