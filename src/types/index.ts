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

export type ContactList = {
  value: string;
  isPrimary: boolean;
  type: string;
};

export type Contact = {
  id: number;
  name: string;
  company_name: string;
  phone_no?: Array<ContactList> | undefined | null;
  email_address?: Array<ContactList> | undefined | null;
  inOffice?: boolean;
  backDate?: string | undefined | null;
  backTime?: string | undefined | null;
  goneTo?: string | undefined | null;
};

export type Activity = {
  summary: string;
  company_name: string;
  date: string;
  start_time: string;
  end_time: string;
  company_contact?: string;
  closed?: boolean;
};

export type Scheduled_Data = {
  id: number;
  ticket_no: string;
  summary: string;
  schedule_time: string;
  time_dur: string;
  company: string;
  site: string;
};

export type Unscheduled_Data = {
  id: number;
  ticket_no: string;
  summary: string;
  company: string;
  site: string;
};

export type ExpRprt_Data = {
  id: number;
  ticket_no: string;
  type: 'Ticket' | 'Activity';
  summary: string;
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
  data: Array<Ticket> | null;
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
  type: 'Ticket' | 'Activity';
  ticket_no?: string;
  age: number;
  summary: string;
  contact?: string;
  company_name: string;
  status: 'New' | 'Off Board' | 'Scheduled';
  priority: 'DNR' | 'P1' | 'P2' | 'P3';
  phase?: string;
  project?: string;
  start_time?: string;
  end_time?: string;
  time_dur?: string;
  date?: string;
  site?: 'Remote' | 'On-Site' | 'In-House';
  assigned_to?: string;
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
  Companies: undefined;
  Contacts: undefined;
  Settings: undefined;
  Feedback: undefined;
  Teams: undefined;
  SlaPlan: undefined;
};

export type Stopwatch = {
  ticket_no: string;
  summary: string;
  created_at: string;
  timer: number;
  isPlaying?: boolean;
  show?: boolean;
};

export type ScreenItems = {
  id: string;
  name: string;
};

export type SelectFields = {
  id: number;
  name: string;
};

export type NoteTypes = {
  text: NotesType;
  highlight: boolean;
};

export type QNATypes = {
  id: number;
  ques: string;
  ans: string;
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
  list?: SelectFields[];
  selectedItem?: SelectFields;
  searchable?: boolean;
  headerTitle?: string;
  key?: string;
  value?: string | boolean | null;
};

export type Item = {
  id: number;
  img?: any;
  title: string;
  time: string;
  date: string;
  note?: string;
  type?: NotesType;
};

export type CompanySites = {
  id: number;
  type: string;
  company_name: string;
  address?: string;
};

/**
 * @types for canny.io
 */

export type CannyCategory = {
  boardID?: string;
  limit?: number;
  skip?: number;
};

export type CannyPosts = {
  boardID?: string;
  authorID?: string;
  companyID?: string;
  tagIDs?: string[];
  limit?: number;
  search?: string;
  skip?: number;
  sort?: string;
  status?: string;
};

export type Canny_CreatePost = {
  authorID: string;
  boardID: string;
  details: string;
  title: string;
  imageURLs?: string[];
  byID?: string;
  categoryID?: string;
  customFields?: object;
  eta?: string;
  etaPublic?: boolean;
  ownerID?: string;
};

/*
//* Enum's for all Types/Interfaces
*/

export enum NotesType {
  Discussion = 'Discussion',
  Internal = 'Internal',
  Resolution = 'Resolution',
  Accounting = 'Accounting',
  Comment = 'Comment',
  Informational = 'Informational',
  Technical = 'Technical',
}
