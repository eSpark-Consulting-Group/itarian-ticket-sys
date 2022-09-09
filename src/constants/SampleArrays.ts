import Images from '../assets/images';
import {
  Activity,
  Company,
  Configuration,
  Contact,
  ExpReportList,
  Filter,
  Item,
  ModalFormArrayType,
  Opportunity,
  ScheduledList,
  ScreenItems,
  SelectFields,
  NotesType,
  Stopwatch,
  Ticket,
  TimeSheet,
  UnscheduledList,
  QNATypes,
  NoteTypes,
} from '../types';
import { boardList, companyNameList, contactNameList, priorityList, siteList, statusList, subTypesList, typeList } from './SelectionList';

/*
//* Sample Array List Disposable in the Future
*/

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
    assigned_to: 'John Doe',
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
    schedule_time: null,
    time_dur: '2.5h',
    project: 'Server Migration',
    site: 'Remote',
    assigned_to: 'Blake Wesker',
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
    assigned_to: 'John Doe',
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
    schedule_time: null,
    time_dur: '2.5h',
    project: 'Server Migration',
    site: 'Remote',
    assigned_to: 'Bob Kins',
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
    assigned_to: 'Brad Coops',
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
    schedule_time: null,
    time_dur: '2.5h',
    project: 'Server Migration',
    site: 'Remote',
    assigned_to: 'Kevin Spacey',
  },
  {
    id: 6,
    ticket_no: '#15529',
    age: 14.5,
    company: 'Fact Tech',
    ticket_summary: 'Purchasing new Instruments and Equipments',
    status: 'Scheduled',
    priority: 'P3',
    phase: 'New',
    schedule_time: null,
    time_dur: '2.5h',
    project: 'Server Migration',
    site: 'Remote',
    assigned_to: 'John Doe',
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
    id: 1,
    name: 'John Doe',
    company_name: 'ACME Industries',
    phone_no: '+555 555 5555',
    email_address: null,
    inOffice: true,
    backDate: null,
    backTime: null,
    goneTo: null,
  },
  {
    id: 2,
    name: 'Blake Wesker',
    company_name: 'Monsters INC',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
    inOffice: true,
    backDate: null,
    backTime: null,
    goneTo: null,
  },
  {
    id: 3,
    name: 'Bob Kins',
    company_name: 'Bethesda Studios',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
    inOffice: true,
    backDate: null,
    backTime: null,
    goneTo: null,
  },
  {
    id: 4,
    name: 'Kevin Spacey',
    company_name: 'Walt Disney',
    phone_no: null,
    email_address: 'email@test.com',
    backDate: '17 August 2022',
    backTime: '05:00 PM',
    goneTo: 'Gone for the day',
  },
  {
    id: 5,
    name: 'Brad Coops',
    company_name: 'XYZ Company',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
    inOffice: true,
    backDate: null,
    backTime: null,
    goneTo: null,
  },
  {
    id: 6,
    name: 'Jimmy Neutron',
    company_name: 'Coca Cola Ltd',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
    inOffice: false,
    backDate: '18 August 2022',
    backTime: '08:00 PM',
    goneTo: 'Client',
  },
  {
    id: 7,
    name: 'Zeeshan Akram',
    company_name: 'K-Electric Corp',
    phone_no: null,
    email_address: null,
    inOffice: false,
    backDate: '16 August 2022',
    backTime: '08:00 PM',
    goneTo: 'Appointment',
  },
  {
    id: 8,
    name: 'Hardeep Vishnam',
    company_name: 'Star Trek Enterprises',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
    backDate: '20 August 2022',
    backTime: '08:00 PM',
    goneTo: 'Others',
  },
  {
    id: 9,
    name: 'Carl Johnson',
    company_name: 'Star Trek Enterprises',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
    inOffice: false,
    backDate: '25 August 2022',
    backTime: '08:00 PM',
    goneTo: 'Gone for the day',
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
    date: 'Aug 29, 2022',
    start_time: '9:30 AM',
    end_time: '10:00 AM',
  },
  {
    name: 'Visit Potential Prospect',
    company_name: 'XYZ Company Incorporated',
    date: 'Aug 28, 2022',
    start_time: '10:30 AM',
    end_time: '11:00 AM',
    company_contact: '+555 5555 555',
  },
  {
    name: 'B2B Reports',
    company_name: 'Zoom Electronics',
    date: 'Aug 1, 2022',
    start_time: '09:30 PM',
    end_time: '11:00 PM',
    company_contact: '+555 5555 555',
  },
  {
    name: 'Inspection',
    company_name: 'Coca Cola Limited',
    date: 'Aug 25, 2022',
    start_time: '10:00 AM',
    end_time: '11:45 AM',
    company_contact: '+555 5555 555',
  },
  {
    name: 'Inspection',
    company_name: 'Coca Cola Limited',
    date: 'Jul 25, 2022',
    start_time: '10:00 AM',
    end_time: '11:45 AM',
    company_contact: '+555 5555 555',
  },
];

export const expReportList: Array<ExpReportList> = [
  {
    id: 1,
    date: new Date(2022, 7, 9),
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
    date: new Date(2022, 7, 14),
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
    data: ticketsList.filter(val => val?.schedule_time),
  },
  {
    id: 2,
    date: new Date(2022, 10, 14),
    data: ticketsList.filter(val => val?.schedule_time),
  },
];

export const unscheduledList: Array<UnscheduledList> = [
  {
    id: 3,
    date: new Date(2022, 10, 13),
    data: ticketsList.filter(val => !val?.schedule_time),
  },
  {
    id: 4,
    date: new Date(2022, 10, 15),
    data: ticketsList.filter(val => !val?.schedule_time),
  },
];

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

export const GoneToFormArray: SelectFields[] = [
  {id: 1, name: 'Lunch'},
  {id: 2, name: 'Appointment'},
  {id: 3, name: 'Client'},
  {id: 4, name: 'Gone for the day'},
  {id: 5, name: 'Other'},
  {id: 6, name: 'Sick'},
  {id: 7, name: 'Vacation'},
];

export const NoteTypes_DIR: NoteTypes[] = [
  {
    text: NotesType.Discussion,
    highlight: true,
  },
  {
    text: NotesType.Internal,
    highlight: false,
  },
  {
    text: NotesType.Resolution,
    highlight: false,
  },
];

export const NoteTypes_ACIT: NoteTypes[] = [
  {
    text: NotesType.Accounting,
    highlight: true,
  },
  {
    text: NotesType.Comment,
    highlight: false,
  },
  {
    text: NotesType.Informational,
    highlight: false,
  },
  {
    text: NotesType.Technical,
    highlight: false,
  },
];

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
    timer: 0,
    isPlaying: false,
    show: true
  },
  {
    ticket_no: '#56231',
    ticket_summary: 'Team Prep Authorization',
    created_at: '26, August 2019',
    timer: 0,
    isPlaying: false,
    show: true
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
    list: boardList,
    selectedItem: boardList[0],
    headerTitle: 'Service Board',
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
    list: priorityList,
    selectedItem: priorityList[0],
    headerTitle: 'Priority',
  },
  {
    title: 'Please Select',
    subTitle: 'Company',
    rightIcon: 'chevron-right',
    list: companyNameList,
    selectedItem: companyNameList[0],
    headerTitle: 'Company',
    searchable: true,
  },
  {
    title: 'Please Select',
    subTitle: 'Site',
    enable: false,
    list: siteList,
    selectedItem: siteList[0],
    headerTitle: 'Site',
  },
  {
    title: 'Contact',
    subTitle: 'Please Select',
    rightIcon: 'chevron-right',
    list: contactsList,
    selectedItem: contactsList[0],
    headerTitle: 'Contact',
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
    list: siteList,
    selectedItem: siteList[0],
    headerTitle: 'Service Projects',
  },
  {
    title: 'All',
    subTitle: 'Status',
    rightIcon: 'chevron-right',
    list: statusList,
    selectedItem: statusList[0],
    headerTitle: 'Status',
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
    list: contactNameList,
    selectedItem: contactNameList[0],
    headerTitle: 'Contact',
    searchable: true,
  },
  {
    title: 'All',
    subTitle: 'Status',
    rightIcon: 'chevron-right',
    list: statusList,
    selectedItem: statusList[0],
    headerTitle: 'Status',
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
    list: typeList,
    selectedItem: typeList[0],
    headerTitle: 'Type',
  },
];

export const noteList: Item[] = [
  {
    id: 1,
    img: Images.AvatarHolder,
    title: 'Template 1',
    time: '12:19 AM',
    date: '11 Nov, 2021',
    note: 'Sit anim laborum laboris reprehenderit tempor anim magna ut. Sunt eiusmod Lorem veniam exercitation pariatur sit occaecat sunt non eu deserunt aliquip dolor.',
    type: NotesType.Discussion,
  },
  {
    id: 2,
    img: Images.AvatarHolder,
    title: 'Template 2',
    time: '12:19 AM',
    date: '15 Nov, 2021',
    type: NotesType.Discussion,
  },
  {
    id: 3,
    img: Images.AvatarHolder,
    title: 'Template 3',
    time: '12:19 AM',
    date: '19 Nov, 2021',
    type: NotesType.Discussion,
  },
  {
    id: 4,
    img: Images.AvatarHolder,
    title: 'Template 4',
    time: '12:19 AM',
    date: '19 Nov, 2021',
    note: 'Sit anim laborum laboris reprehenderit tempor anim magna ut. Sunt eiusmod Lorem veniam exercitation pariatur sit occaecat sunt non eu deserunt aliquip dolor.',
    type: NotesType.Internal,
  },
  {
    id: 5,
    img: Images.AvatarHolder,
    title: 'Template 5',
    time: '12:19 AM',
    date: '19 Nov, 2021',
    type: NotesType.Internal,
  },
  {
    id: 6,
    img: Images.AvatarHolder,
    title: 'Template 6',
    time: '12:19 AM',
    date: '19 Nov, 2021',
    note: 'Sit anim laborum laboris reprehenderit tempor anim magna ut. Sunt eiusmod Lorem veniam exercitation pariatur sit occaecat sunt non eu deserunt aliquip dolor.',
    type: NotesType.Internal,
  },
  {
    id: 7,
    img: Images.AvatarHolder,
    title: 'Template 7',
    time: '12:19 AM',
    date: '19 Nov, 2021',
    type: NotesType.Accounting,
  },
  {
    id: 8,
    img: Images.AvatarHolder,
    title: 'Template 8',
    time: '12:19 AM',
    date: '19 Nov, 2021',
    note: 'Sit anim laborum laboris reprehenderit tempor anim magna ut. Sunt eiusmod Lorem veniam exercitation pariatur sit occaecat sunt non eu deserunt aliquip dolor.',
    type: NotesType.Accounting,
  },
  {
    id: 9,
    img: Images.AvatarHolder,
    title: 'Template 9',
    time: '12:19 AM',
    date: '19 Nov, 2021',
    note: 'Sit anim laborum laboris reprehenderit tempor anim magna ut. Sunt eiusmod Lorem veniam exercitation pariatur sit occaecat sunt non eu deserunt aliquip dolor.',
    type: NotesType.Informational,
  },
];
