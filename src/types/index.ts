import {KeyboardTypeOptions, ViewStyle} from 'react-native';
import {User} from './globalState';

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

export type ScheduledList = {
  id: number;
  date: Date;
  data: Array<Ticket>;
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
  TicketPriorities: undefined;
  Departments: undefined;
  Locations: undefined;
  HelpTopics: undefined;
  CannedResponse: undefined;
  Groups: undefined;
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

export type CannyBoards = {
  created: Date;
  id: string;
  isPrivate: boolean;
  name: string;
  postCount: number;
  privateComments: null;
  token: string;
  url: string;
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

export type Canny_CreateUser = {
  avatarURL?: string;
  companies?: any[];
  created?: Date;
  customFields?: {};
  email?: string;
  name: string;
  userID: string;
};

export type Vote = {
  userID: string;
  postID: string;
};

export type Vote_CD = {
  voterID: string;
  postID: string;
};

export type Canny_CreateComment = {
  authorID: string;
  postID: string;
  parentID?: string;
  value: string | null;
  imageURLs?: string[];
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

export interface DataItem {
  title: string;
  subTitle?: string;
  inputable?: boolean;
  enable?: boolean;
  rightIcon?: string;
  rightIconRound?: string;
  titleWidth?: number;
  showRightSwitch?: boolean;
  rightSwitchVal?: boolean;
  onChangeSwitch?: (value: boolean) => void;
  onChangeText?: (text: string) => void;
  list?: SelectFields[];
  selectedItem?: SelectFields;
  searchable?: boolean;
  headerTitle?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  isRequired?: boolean;
  mode?: 'none' | 'multiline';
  key?: string;
  onPress?: () => void;
  roundedIconEnable?: boolean;
  leftIcon?: string;
  onRoundIconPress?: () => void;
  rightChild?: React.ReactNode;
  contacts?: ContactList[] | null | undefined;
}

export type {User};
