import {ViewStyle} from 'react-native';

/*
//* Types for all list Data
*/

export type Company = {
  id: string;
  name: string;
  address: string;
  employees?: number | null;
};

export type Contact = {
  name: string;
  company_name: string;
  phone_no?: string | undefined | null;
  email_address?: string | undefined | null;
  inOffice?: boolean;
};

export type Configuration = {
  name: string;
  company_name: string;
  tag?: string | null | undefined;
  model?: string | null | undefined;
  serial?: string | null | undefined;
};

export type Activity = {
  name: string;
  company_name: string;
  date: string;
  start_time: string;
  end_time: string;
  company_contact?: string;
};

export type Scheduled_Data = {
  id: number;
  ticket_no: string;
  ticket_summary: string;
  schedule_time: string;
  time_dur: string;
  company: string;
  site: string;
};

export type Unscheduled_Data = {
  id: number;
  ticket_no: string;
  ticket_summary: string;
  company: string;
  site: string;
};

export type ExpRprt_Data = {
  id: number;
  ticket_no: string;
  task: string;
  totExp: string;
  expType: string;
};

export type ScheduledList = {
  id: number;
  date: Date;
  data: Array<Ticket>;
};

export type UnscheduledList = {
  id: number;
  date: Date;
  data: Array<Ticket>;
};

export type ExpReportList = {
  id: number;
  date: Date;
  data: Array<ExpRprt_Data>;
  totExp: number;
};

export type TimeSheet = {
  id: number;
  date: Date;
  data: Array<Ticket>;
  totHrs: number;
};

export type FloatButtons = {
  icon: string;
  onPress?: () => void | undefined;
  style?: ViewStyle;
  AdditionalButtons: any;
};

export type AdditionalButtons = {
  icon: string;
  label: string;
  color: string;
  style: any;
  labelTextColor?: string;
  labelStyle: object;
  onPress: () => void;
};

export type ModalFormDataArrayType = {
  headingRight?: string;
  subHeadingRight?: string;
  headingLeft?: string;
  subHeadingLeft?: string;
  iconRight?: string;
  switchRight?: boolean;
  switch_val?: boolean;
  iconLeft?: string;
  pressEnable?: boolean;
  onPress?: () => void;
  pressEnableRight?: boolean;
  onPressRight?: () => void;
  subIconLeft?: string;
  subIconRight?: string;
  checkBoxRight?: boolean;
  checkBox_Val?: string;
  navigateTo?: string;
  visible?: boolean;
  input_Val?: string;
  select_Date?: boolean;
  select_Time?: boolean;
};

export type ModalFormArrayType = {
  type:
    | 'inlined'
    | 'inline'
    | 'inline-icon'
    | 'inline-switch'
    | 'block'
    | 'iconBlock'
    | 'multiline';
  data: ModalFormDataArrayType;
  formName?: string;
};

export type Ticket = {
  id: number;
  ticket_no: number;
  age: number;
  ticket_summary: string;
  contact?: string;
  company: string;
  status: 'New' | 'Off Board' | 'Scheduled';
  priority: 'DNR' | 'P1' | 'P2' | 'P3';
  phase?: string;
  project?: string;
  schedule_time?: string;
  time_dur?: string;
  site?: 'Remote' | 'On-Site' | 'In-House';
};

export type Opportunity = {
  name: string;
  contact: string;
  contant_phone?: string;
  priority: 'normal' | 'low' | 'high' | 'critical';
  sales_Rep: string;
  company: string;
  status: string;
  close_date: string;
};

export type ParamList = {
  FSLoader: undefined;
  Agenda: undefined;
  Search: undefined;
  Profile: {
    status: boolean;
  };
  Forms: undefined;
  Calendar: undefined;
  Companies: undefined;
  Contacts: undefined;
  Configurations: undefined;
  SBoard: undefined;
  PBoard: undefined;
  MyActivities: undefined;
  Opportunities: undefined;
  IOBoard: undefined;
  ExpReports: undefined;
  TimeSheets: undefined;
  StopWatch: undefined;
  Settings: undefined;
  Feedback: undefined;
};

export type Stopwatch = {
  ticket_no: string;
  ticket_summary: string;
  created_at: string;
  timer: string;
  isPlaying?: boolean;
};

export type ScreenItems = {
  id: string;
  name: string;
};

export type SelectFeilds = {
  id: number;
  name: string;
};

export type Filter = {
  title: string;
  subTitle?: string;
  inputable?: boolean;
  enable?: boolean;
  rightIcon?: string;
  rightIconRound?: string;
  titleWidth?: number;
  showRightSwitch?: boolean;
  rightSwitchVal?: boolean;
  leftIcon?: string;
};
