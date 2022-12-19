import {AdditionalButtons} from '../types';

const AdditionalButtonStyle = {
  color: '#fff',
  labelTextColor: '#000000c2',
  labelStyle: {backgroundColor: '#fff'},
  style: {
    backgroundColor: '#28648f',
    borderRadius: 1000,
  },
};

//? -------- Float Action Additional Buttons for Multiple Screens

export const SchAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'tag-plus-outline',
    label: 'Add Ticket',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];

export const UnschAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'tag-plus-outline',
    label: 'Add Ticket',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];

export const STicketsAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'tag-plus-outline',
    label: 'Add Ticket',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];

export const AddExpenseAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'cash-plus',
    label: 'Add Tax Type',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];

export const TimeSheetAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'clock-plus-outline',
    label: 'Add Time',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
  {
    icon: 'calendar-plus',
    label: 'Submit Time Sheet',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];

export const NotesAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'clipboard-plus',
    label: 'Standard Note',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
  {
    icon: 'clock-plus-outline',
    label: 'Time Stamp',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];

export const AttachmentAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'file-search-outline',
    label: 'Add Files',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
  {
    icon: 'image',
    label: 'Choose Image',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
  {
    icon: 'camera-outline',
    label: 'Take Photo',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];

export const ActivityAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'currency-usd',
    label: 'Add Expense',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
  {
    icon: 'clock-plus-outline',
    label: 'Add Time',
    onPress: () => {},
    ...AdditionalButtonStyle,
  },
];
