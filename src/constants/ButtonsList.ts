import {AdditionalButtons} from '../types';

export const AdditionalButtonStyle = {
  backgroundColor: '#28648f',
  borderRadius: 1000,
};

//? -------- Float Action Additional Buttons for Multiple Screens

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

export const ExpenseAdditionalButtons: Array<AdditionalButtons> = [
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
];

export const STicketsAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'file-sign',
    label: 'Add Signature',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed star'),
  },
  {
    icon: 'calendar-plus',
    label: 'Add Resource',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed star'),
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
    icon: 'timetable',
    label: 'Add Time',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed star'),
  },
];

export const AddExpenseAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'cash-plus',
    label: 'Add Tax Type',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed star'),
  },
];

export const TimeSheetAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'clock-plus-outline',
    label: 'Add Time',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed star'),
  },
  {
    icon: 'calendar-plus',
    label: 'Submit Time Sheet',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed email'),
  },
];

export const NotesAdditionalButtons: Array<AdditionalButtons> = [
  {
    icon: 'clipboard-plus',
    label: 'Standard Note',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed email'),
  },
  {
    icon: 'clock-plus-outline',
    label: 'Time Stamp',
    color: '#FFF',
    style: AdditionalButtonStyle,
    labelTextColor: '#000000c2',
    labelStyle: {backgroundColor: '#fff'},
    onPress: () => console.log('Pressed star'),
  },
];
