import {
  Activity,
  AdditionalButtons,
  Company,
  Configuration,
  Contact,
  ExpReportList,
  ExpRprt_Data,
  Filter,
  FloatButtons,
  ModalFormArrayType,
  ModalFormDataArrayType,
  Opportunity,
  ParamList,
  ScheduledList,
  Scheduled_Data,
  ScreenItems,
  SelectFeilds,
  Stopwatch,
  Ticket,
  TimeSheet,
  UnscheduledList,
  Unscheduled_Data,
} from '../types';

/*
//* Sample Array List Disposable in the Future
*/

export const AdditionalButtonStyle = {
  backgroundColor: '#28648f',
  borderRadius: 1000,
};

export const ticketsList: Ticket[] = [
  {
    id: 0,
    ticket_no: '#15222',
    age: 4.6,
    company: 'ACME Corporation',
    contact: 'Mills Davidson',
    ticket_summary: 'Need urgent Repairs, and Fixes',
    status: 'New',
    priority: 'P3',
    phase: 'Tech Prep',
    schedule_time: '10:00AM - 12:30PM',
    time_dur: '2.5h',
    project: 'Server Migration',
    site: 'Remote',
  },
  {
    id: 1,
    ticket_no: '#15299',
    age: 6.5,
    company: 'Coca Cola Industries',
    contact: 'Joe Burns',
    ticket_summary: 'Re-supply and Re-Configure Inteventory',
    status: 'Scheduled',
    priority: 'DNR',
    phase: 'Tech Prep',
    schedule_time: '10:00AM - 12:30PM',
    time_dur: '2.5h',
    project: 'Server Migration',
    site: 'Remote',
  },
  {
    id: 2,
    ticket_no: '#15351',
    age: 2.2,
    company: 'Business INC',
    contact: 'Emiko Matsuzaka',
    ticket_summary: 'Recruitment Drive Commence',
    status: 'Scheduled',
    priority: 'P1',
    phase: 'Tech Prep',
    schedule_time: '10:00AM - 12:30PM',
    time_dur: '2.5h',
    project: 'Server Migration',
    site: 'Remote',
  },
  {
    id: 3,
    ticket_no: '#15779',
    age: 1.0,
    company: 'Infusions Tech',
    ticket_summary: 'Dispose of Waste Materials',
    status: 'Scheduled',
    priority: 'DNR',
    phase: 'New',
    schedule_time: '10:00AM - 12:30PM',
    time_dur: '2.5h',
    project: 'Server Migration',
    site: 'Remote',
  },
  {
    id: 4,
    ticket_no: '#16831',
    age: 6.3,
    company: 'Miners Co & Sons',
    contact: 'Jim Evans',
    ticket_summary: 'Gather Reports on Employees',
    status: 'New',
    priority: 'P2',
    phase: 'New',
    schedule_time: '10:00AM - 12:30PM',
    time_dur: '2.5h',
    project: 'Server Migration',
    site: 'Remote',
  },
  {
    id: 5,
    ticket_no: '#15529',
    age: 14.5,
    company: 'Fusion Tech',
    ticket_summary: 'Purchasing new Instruments and Equipments',
    status: 'Scheduled',
    priority: 'P3',
    phase: 'New',
    schedule_time: '10:00AM - 12:30PM',
    time_dur: '2.5h',
    project: 'Server Migration',
    site: 'Remote',
  },
];

export const companiesList: Array<Company> = [
  {
    id: 'C01',
    name: 'Lorem Ipsum Company Ltd',
    address: 'Street no 23, State California, USA',
    employees: 25,
  },
  {
    id: 'C02',
    name: 'ACME Company',
    address: 'In incididunt occaecat adipisicing est velit deserunt',
    employees: 5,
  },
  {
    id: 'C03',
    name: "Steeler's Incorporated",
    address: 'Nulla aute laborum reprehenderit cupidatat ad minim',
    employees: null,
  },
  {
    id: 'C04',
    name: 'eSpark Consulting Group',
    address: 'Occaecat consequat aute ipsum aliquip nostrud reprehenderit',
    employees: 50,
  },
  {
    id: 'C05',
    name: 'Ezlo Innovation',
    address: 'Adipisicing occaecat id eiusmod occaecat fugiat sint',
    employees: 200,
  },
  {
    id: 'C06',
    name: 'Google LLC',
    address:
      'Cupidatat sint ea ullamco cillum ea ipsum voluptate fugiat est incididunt',
    employees: 10_000,
  },
  {
    id: 'C07',
    name: '2K Industries',
    address: 'Occaecat culpa deserunt officia consequat ipsum',
    employees: 5000,
  },
  {
    id: 'C08',
    name: 'Oscorp Industries',
    address:
      'Cupidatat sint ea ullamco cillum ea ipsum voluptate fugiat est incididunt',
    employees: 10_000_000,
  },
  {
    id: 'C09',
    name: 'Fauji Fertilizers',
    address: 'Dolor dolore nostrud anim ea eu velit voluptate',
    employees: 2500,
  },
  {
    id: 'C10',
    name: 'Tesla LLC',
    address: 'Cupidatat tempor nulla sunt nostrud sit voluptate sunt pariatur',
    employees: 50_000,
  },
  {
    id: 'C11',
    name: 'Walt Disney Productions',
    address: 'Dolore consequat esse aute Lorem sint elit',
    employees: 25_000,
  },
  {
    id: 'C12',
    name: 'Besthesda Studios',
    address: 'Consequat adipisicing aliqua ut officia ipsum nisi dolor',
    employees: 2000,
  },
];

export const contactsList: Contact[] = [
  {
    name: 'John Doe',
    company_name: 'ACME Industries',
    phone_no: '+555 555 5555',
    email_address: null,
    inOffice: true,
  },
  {
    name: 'Blake Wesker',
    company_name: 'Monsters INC',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
    inOffice: true,
  },
  {
    name: 'Bob Kins',
    company_name: 'Bethesda Studios',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
    inOffice: true,
  },
  {
    name: 'Kevin Spacey',
    company_name: 'Walt Disney',
    phone_no: null,
    email_address: 'email@test.com',
  },
  {
    name: 'Brad Coops',
    company_name: 'XYZ Company',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
    inOffice: true,
  },
  {
    name: 'Jimmy Neutron',
    company_name: 'Coca Cola Ltd',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
    inOffice: false,
  },
  {
    name: 'Zeeshan Akram',
    company_name: 'K-Electric Corp',
    phone_no: null,
    email_address: null,
    inOffice: false,
  },
  {
    name: 'Hardeep Vishnam',
    company_name: 'Star Trek Enterprises',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
  },
  {
    name: 'Carl Johnson',
    company_name: 'Star Trek Enterprises',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
    inOffice: false,
  },
];

export const configurationsList: Configuration[] = [
  {
    name: '#90234',
    company_name: 'ACE Chemicals',
    tag: 'T24',
    model: '2020',
    serial: 'S/N129455',
  },
  {
    name: '550-212',
    company_name: 'iTarian LLC',
    tag: 'T2',
    model: '2011',
    serial: 'S/N129444',
  },
  {
    name: '05211',
    company_name: 'Ezlo Innovation',
    tag: 'T1',
    model: '2009',
    serial: 'S/N129412',
  },
  {
    name: '1101',
    company_name: 'Hammer Technologies',
    tag: 'T64',
    model: '2007',
    serial: 'S/N129416',
  },
  {
    name: '#23',
    company_name: 'Stark Industries',
    tag: 'T33',
    model: '2017',
    serial: 'S/N129546',
  },
  {name: '253/23', company_name: 'Lorem Ipsum Inc', model: '2019'},
  {name: 'testA12', company_name: 'XYZ Comapany', serial: 'S/N121232'},
  {name: 'Mach-5', company_name: 'Racer Motor Company'},
  {name: 'JF-17', company_name: 'Pakistan Air Force'},
  {name: 'F-25', company_name: 'US Air Force', tag: 'T90'},
];

export const activitiesList: Array<Activity> = [
  {
    name: 'Process Bills',
    company_name: 'Ezlo Innovations',
    date: 'Nov 16, 2020',
    start_time: '9:30 AM',
    end_time: '10:00 AM',
  },
  {
    name: 'Visit Potential Prospect',
    company_name: 'XYZ Company Incorporated',
    date: 'Nov 17, 2020',
    start_time: '10:30 AM',
    end_time: '11:00 AM',
    company_contact: '+555 5555 555',
  },
  {
    name: 'B2B Reports',
    company_name: 'Zoom Electronics',
    date: 'Dec 17, 2020',
    start_time: '09:30 PM',
    end_time: '11:00 PM',
    company_contact: '+555 5555 555',
  },
  {
    name: 'Inspection',
    company_name: 'Coca Cola Limited',
    date: 'Dec 20, 2020',
    start_time: '10:00 AM',
    end_time: '11:45 AM',
    company_contact: '+555 5555 555',
  },
];

export const expReportList: Array<ExpReportList> = [
  {
    id: 1,
    date: new Date(2022, 7, 1),
    totExp: 723,
    data: [
      {
        id: 1,
        ticket_no: '#15340',
        ticket_summary: 'Config Service History # 2',
        totExp: '$119.00',
        expType: 'Parts ',
      },
      {
        id: 2,
        ticket_no: '#15346',
        ticket_summary: 'Weekly Team Meeting',
        totExp: '$456.00',
        expType: 'Miscellaneous',
      },
      {
        id: 3,
        ticket_no: '#16357',
        ticket_summary: 'New Server Installation',
        totExp: '$148.00',
        expType: 'Equipments',
      },
    ],
  },
  {
    id: 2,
    date: new Date(2022, 7, 5),
    totExp: 1123,
    data: [
      {
        id: 4,
        ticket_no: '#18464',
        ticket_summary: 'Products for Exchange Server',
        totExp: '$1123.00',
        expType: 'Products',
      },
    ],
  },
];

export const timeSheetList: Array<TimeSheet> = [
  {
    id: 1,
    date: new Date(2022, 7, 9),
    totHrs: 2.5,
    data: ticketsList,
  },
  {
    id: 2,
    date: new Date(2022, 7, 14),
    totHrs: 3.5,
    data: ticketsList,
  },
];

export const scheduledList: Array<ScheduledList> = [
  {
    id: 1,
    date: new Date(2022, 10, 12),
    data: ticketsList,
  },
  {
    id: 2,
    date: new Date(2022, 10, 14),
    data: ticketsList,
  },
];

export const unscheduledList: Array<UnscheduledList> = [
  {
    id: 3,
    date: new Date(2022, 10, 13),
    data: ticketsList,
  },
  {
    id: 4,
    date: new Date(2022, 10, 15),
    data: ticketsList,
  },
];

export const SchAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'clipboard-plus-outline',
    label: 'Add Activity',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => {},
  },
  {
    icon: 'calendar-plus',
    label: 'Add Misc Schedule',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff', color: '#000'},
    onPress: () => console.log('Pressed email'),
  },
  {
    icon: 'tag-plus-outline',
    label: 'Add Ticket',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff', color: '#000'},
    onPress: () => console.log('Pressed notifications'),
  },
];

export const UnschAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'clipboard-plus',
    label: 'Add Activity',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed star'),
  },
  {
    icon: 'calendar-plus',
    label: 'Add Misc Schedule',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed email'),
  },
  {
    icon: 'tag-plus-outline',
    label: 'Add Ticket',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed notifications'),
  },
];

export const ExpenseAdditionalButtons : Array<AdditionalButtons> = [
  {
    icon: 'currency-usd',
    label: 'Add Expense',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed star'),
  },
  {
    icon: 'calendar-plus',
    label: 'Submit Report	',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed email'),
  },
]

export const StatusFormArray: Array<ModalFormArrayType> = [
  {
    formName: 'My Status',
    type: 'inlined',
    data: {
      headingLeft: 'Are you out of the office?',
      switchRight: true,
    },
  },
  {
    formName: 'My Status',
    type: 'inlined',
    data: {
      pressEnable: true,
      visible: false,
      headingLeft: 'Gone To',
      subHeadingLeft: 'Please Select',
      navigateTo: 'Gone To',
      onPress: () => console.log('Inlined Pressed'),
    },
  },
  {
    formName: 'My Status',
    type: 'multiline',
    data: {
      headingLeft: 'Additional Info',
      visible: false,
    },
  },
  {
    formName: 'My Status',
    type: 'inlined',
    data: {
      headingLeft: 'Date Back',
      subHeadingLeft: '--',
      headingRight: 'Time Back',
      subHeadingRight: '--',
      subIconRight: 'timer-outline',
      subIconLeft: 'calendar-outline',
      pressEnable: true,
      pressEnableRight: true,
      visible: false,
      input_Val: '',
      select_Date: false,
      select_Time: false,
    },
  },
];

export const GoneToFormArray: SelectFeilds[] = [
  {id: 1, name: 'Appointment'},
  {id: 2, name: 'Client'},
  {id: 3, name: 'Gone for the day'},
  {id: 4, name: 'Lunch'},
  {id: 5, name: 'Other'},
  {id: 6, name: 'Sick'},
  {id: 7, name: 'Vacation'},
];

// export const GoneToFormArray: Array<ModalFormArrayType> = [
//   {
//     formName: 'Gone To',
//     type: 'inlined',
//     data: {
//       headingLeft: 'Appointment',
//       checkBoxRight: true,
//     },
//   },
//   {
//     formName: 'Gone To',
//     type: 'inlined',
//     data: {
//       headingLeft: 'Client',
//       checkBoxRight: true,
//     },
//   },
//   {
//     formName: 'Gone To',
//     type: 'inlined',
//     data: {
//       headingLeft: 'Gone for the day',
//       checkBoxRight: true,
//     },
//   },
//   {
//     formName: 'Gone To',
//     type: 'inlined',
//     data: {
//       headingLeft: 'Lunch',
//       checkBoxRight: true,
//     },
//   },
//   {
//     formName: 'Gone To',
//     type: 'inlined',
//     data: {
//       headingLeft: 'Other',
//       checkBoxRight: true,
//     },
//   },
//   {
//     formName: 'Gone To',
//     type: 'inlined',
//     data: {
//       headingLeft: 'Sick',
//       checkBoxRight: true,
//     },
//   },
//   {
//     formName: 'Gone To',
//     type: 'inlined',
//     data: {
//       headingLeft: 'Vacation',
//       checkBoxRight: true,
//     },
//   },
// ];

export const opportunitiesList: Opportunity[] = [
  {
    name: 'New Site Wiring',
    contact: 'Tim Smith',
    contant_phone: '+1 555 5555',
    priority: 'high',
    sales_Rep: 'Mark Hamill',
    company: 'Acme IT Solutions',
    status: 'Customer Approved',
    close_date: '30 Dec 2021',
  },
  {
    name: 'Treasure Hunting',
    contact: 'Nathan Drake',
    // contant_phone: '+1 555 5555',
    priority: 'critical',
    sales_Rep: 'Victor Sullivan',
    company: 'Acme IT Solutions',
    status: 'Customer Approved',
    close_date: '24 Apr 2009',
  },
  {
    name: 'Purchasing Tools',
    contact: 'Chloe Frazer',
    contant_phone: '+1 555 5555',
    priority: 'low',
    sales_Rep: 'Nadine Ross',
    company: 'Acme IT Solutions',
    status: 'Customer Approved',
    close_date: '11 Nov 2017',
  },
  {
    name: 'Re-arranging Items',
    contact: 'Rafe Adler',
    contant_phone: '+1 555 5555',
    priority: 'normal',
    sales_Rep: 'Jim Barns',
    company: 'Acme IT Solutions',
    status: 'Customer Approved',
    close_date: '22 Jul 2018',
  },
];

export const stopWatchList: Stopwatch[] = [
  {
    ticket_no: '#12348',
    ticket_summary: 'Checking for Mantaince',
    created_at: '20, June 2021',
    timer: '00:13:42',
    isPlaying: false,
  },
  {
    ticket_no: '#56231',
    ticket_summary: 'Team Prep Authorization',
    created_at: '26, August 2019',
    timer: '00:08:10',
    isPlaying: false,
  },
];

export const screenItemList: ScreenItems[] = [
  {
    id: 'Agenda',
    name: 'Agenda',
  },
  {
    id: 'Search',
    name: 'Search',
  },
  {
    id: 'Calendar',
    name: 'Calendar',
  },
  {
    id: 'Companies',
    name: 'Companies',
  },
  {
    id: 'Contacts',
    name: 'Contacts',
  },
  {
    id: 'Configurations',
    name: 'Configurations',
  },
  {
    id: 'SBoard',
    name: 'Service Board',
  },
  {
    id: 'PBoard',
    name: 'Project Board',
  },
  {
    id: 'Opportunities',
    name: 'Opportunities',
  },
  {
    id: 'MyActivities',
    name: 'My Activities',
  },
  {
    id: 'IOBoard',
    name: 'In/Out Board',
  },
  {
    id: 'ExpReports',
    name: 'Expense Reports',
  },
  {
    id: 'TimeSheets',
    name: 'Time Sheets',
  },
  {
    id: 'StopWatch',
    name: 'StopWatch',
  },
];

export const sBoardFiterList: Filter[] = [
  {
    title: 'My Tickets Only',
    showRightSwitch: true,
    enable: false,
    rightSwitchVal: false,
  },
  {
    title: 'All',
    subTitle: 'Service Board',
    rightIcon: 'chevron-right',
  },
  {
    title: 'All',
    subTitle: 'Service Board',
    enable: false,
  },
  {
    title: 'Please Select',
    subTitle: 'Priority',
    rightIcon: 'chevron-right',
  },
  {
    title: 'Please Select',
    subTitle: 'Company',
    rightIcon: 'chevron-right',
  },
  {
    title: 'Please Select',
    subTitle: 'Site',
    enable: false,
  },
  {
    title: 'Contact',
    subTitle: 'Please Select',
    rightIcon: 'chevron-right',
  },
  {
    title: 'All',
    subTitle: 'Type',
    enable: false,
  },
  {
    title: 'All',
    subTitle: 'Subtype',
    enable: false,
  },
  {
    title: 'All',
    subTitle: 'Item',
    enable: false,
  },
];

export const pBoardFilterList: Filter[] = [
  {
    title: 'My Tickets Only',
    showRightSwitch: true,
    enable: false,
    rightSwitchVal: false,
  },
  {
    title: 'Service Projects',
    subTitle: 'Project Board',
    rightIcon: 'chevron-right',
  },
  {
    title: 'All',
    subTitle: 'Status',
    rightIcon: 'chevron-right',
  },
];

export const opportunityFilterList: Filter[] = [
  {
    title: 'My Opportunities',
    showRightSwitch: true,
    enable: false,
    rightSwitchVal: false,
  },
  {
    title: 'John Doe',
    subTitle: 'Contact',
    rightIcon: 'chevron-right',
  },
  {
    title: 'All',
    subTitle: 'Status',
    rightIcon: 'chevron-right',
  },
  {
    subTitle: 'Close Date',
    title: '',
    leftIcon: 'calendar',
    enable: false,
  },
  {
    title: 'All',
    subTitle: 'Type',
    rightIcon: 'chevron-right',
  },
];

export const customFeildList: SelectFeilds[] = [
  {
    id: 1,
    name: 'Custom 1',
  },
  {
    id: 2,
    name: 'Custom 2',
  },
  {
    id: 3,
    name: 'Custom 3',
  },
  {
    id: 4,
    name: 'Custom 4',
  },
  {
    id: 5,
    name: 'Custom 5',
  },
  {
    id: 6,
    name: 'Custom 6',
  },
  {
    id: 7,
    name: 'Custom 7',
  },
  {
    id: 8,
    name: 'Custom 8',
  },
  {
    id: 9,
    name: 'Custom 9',
  },
];

export const siteList: SelectFeilds[] = [
  {
    id: 1,
    name: 'Site 1',
  },
  {
    id: 2,
    name: 'Site 2',
  },
  {
    id: 3,
    name: 'Site 3',
  },
  {
    id: 4,
    name: 'Site 4',
  },
  {
    id: 5,
    name: 'Site 5',
  },
  {
    id: 6,
    name: 'Site 6',
  },
  {
    id: 7,
    name: 'Site 7',
  },
  {
    id: 8,
    name: 'Site 8',
  },
  {
    id: 9,
    name: 'Site 9',
  },
];

export const boardList: SelectFeilds[] = [
  {
    id: 1,
    name: 'Board 1',
  },
  {
    id: 2,
    name: 'Board 2',
  },
  {
    id: 3,
    name: 'Board 3',
  },
  {
    id: 4,
    name: 'Board 4',
  },
  {
    id: 5,
    name: 'Board 5',
  },
  {
    id: 6,
    name: 'Board 6',
  },
  {
    id: 7,
    name: 'Board 7',
  },
  {
    id: 8,
    name: 'Board 8',
  },
  {
    id: 9,
    name: 'Board 9',
  },
];

export const statusList: SelectFeilds[] = [
  {
    id: 1,
    name: 'Status 1',
  },
  {
    id: 2,
    name: 'Status 2',
  },
  {
    id: 3,
    name: 'Status 3',
  },
  {
    id: 4,
    name: 'Status 4',
  },
  {
    id: 5,
    name: 'Status 5',
  },
  {
    id: 6,
    name: 'Status 6',
  },
  {
    id: 7,
    name: 'Status 7',
  },
  {
    id: 8,
    name: 'Status 8',
  },
  {
    id: 9,
    name: 'Status 9',
  },
];

export const typesList: SelectFeilds[] = [
  {
    id: 1,
    name: 'Type 1',
  },
  {
    id: 2,
    name: 'Type 2',
  },
  {
    id: 3,
    name: 'Type 3',
  },
  {
    id: 4,
    name: 'Type 4',
  },
  {
    id: 5,
    name: 'Type 5',
  },
  {
    id: 6,
    name: 'Type 6',
  },
  {
    id: 7,
    name: 'Type 7',
  },
  {
    id: 8,
    name: 'Type 8',
  },
  {
    id: 9,
    name: 'Type 9',
  },
];

export const subTypesList: SelectFeilds[] = [
  {
    id: 1,
    name: 'Subtype 1',
  },
  {
    id: 2,
    name: 'Subtype 2',
  },
  {
    id: 3,
    name: 'Subtype 3',
  },
  {
    id: 4,
    name: 'Subtype 4',
  },
  {
    id: 5,
    name: 'Subtype 5',
  },
  {
    id: 6,
    name: 'Subtype 6',
  },
  {
    id: 7,
    name: 'Subtype 7',
  },
  {
    id: 8,
    name: 'Subtype 8',
  },
  {
    id: 9,
    name: 'Subtype 9',
  },
];

export const itemList: SelectFeilds[] = [
  {
    id: 1,
    name: 'Item 1',
  },
  {
    id: 2,
    name: 'Item 2',
  },
  {
    id: 3,
    name: 'Item 3',
  },
  {
    id: 4,
    name: 'Item 4',
  },
  {
    id: 5,
    name: 'Item 5',
  },
  {
    id: 6,
    name: 'Item 6',
  },
  {
    id: 7,
    name: 'Item 7',
  },
  {
    id: 8,
    name: 'Item 8',
  },
  {
    id: 9,
    name: 'Item 9',
  },
];
