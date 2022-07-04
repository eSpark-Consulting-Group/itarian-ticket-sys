export type Companines = {
  name: string;
  address: string;
  employees?: number | null;
};

export type Contacts = {
  name: string;
  company_name: string;
  phone_no?: string | undefined | null;
  email_address?: string | undefined | null;
};

export type Configurations = {
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
};

export type Agenda = {};

export const companiesList: Array<Companines> = [
  {
    name: 'Lorem Ipsum Company Ltd',
    address: 'Street no 23, State California, USA',
    employees: 25,
  },
  {
    name: 'ACME Company',
    address: 'In incididunt occaecat adipisicing est velit deserunt',
    employees: 5,
  },
  {
    name: "Steeler's Incorporated",
    address: 'Nulla aute laborum reprehenderit cupidatat ad minim',
    employees: null,
  },
  {
    name: 'eSpark Consulting Group',
    address: 'Occaecat consequat aute ipsum aliquip nostrud reprehenderit',
    employees: 50,
  },
  {
    name: 'Ezlo Innovation',
    address: 'Adipisicing occaecat id eiusmod occaecat fugiat sint',
    employees: 200,
  },
  {
    name: 'Google LLC',
    address:
      'Cupidatat sint ea ullamco cillum ea ipsum voluptate fugiat est incididunt',
    employees: 10_000,
  },
  {
    name: '2K Industries',
    address: 'Occaecat culpa deserunt officia consequat ipsum',
    employees: 5000,
  },
  {
    name: 'Oscorp Industries',
    address:
      'Cupidatat sint ea ullamco cillum ea ipsum voluptate fugiat est incididunt',
    employees: 10_000_000,
  },
  {
    name: 'Fauji Fertilizers',
    address: 'Dolor dolore nostrud anim ea eu velit voluptate',
    employees: 2500,
  },
  {
    name: 'Tesla LLC',
    address: 'Cupidatat tempor nulla sunt nostrud sit voluptate sunt pariatur',
    employees: 50_000,
  },
  {
    name: 'Walt Disney Productions',
    address: 'Dolore consequat esse aute Lorem sint elit',
    employees: 25_000,
  },
  {
    name: 'Besthesda Studios',
    address: 'Consequat adipisicing aliqua ut officia ipsum nisi dolor',
    employees: 2000,
  },
];

export const contactsList: Contacts[] = [
  {
    name: 'John Doe',
    company_name: 'ACME Industries',
    phone_no: '+555 555 5555',
    email_address: null,
  },
  {
    name: 'Blake',
    company_name: 'Monsters INC',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
  },
  {
    name: 'Bob Kins',
    company_name: 'Bethesda Studios',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
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
  },
  {
    name: 'Jimmy Neutron',
    company_name: 'Coca Cola Ltd',
    phone_no: '+555 555 5555',
    email_address: 'email@test.com',
  },
  {
    name: 'Zeeshan Akram',
    company_name: 'K-Electric Corp',
    phone_no: null,
    email_address: null,
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
  },
];

export const configurationsList: Configurations[] = [
  {
    name: '#90234',
    company_name: 'ACE Chemicals',
    tag: 'urgent',
    model: '2013',
    serial: 'S/N129446',
  },
  {name: '550-212', company_name: 'iTarian LLC'},
  {name: '05211', company_name: 'Ezlo Innovation'},
  {name: '1101', company_name: 'Hammer Technologies'},
  {name: '#23', company_name: 'Stark Industries'},
  {name: '253/23', company_name: 'Lorem Ipsum Inc'},
  {name: 'testA12', company_name: 'XYZ Comapany'},
  {name: 'Mach-5', company_name: 'Racer Motor Company'},
  {name: 'JF-17', company_name: 'Pakistan Air Force'},
  {name: 'F-25', company_name: 'US Air Force'},
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
  },
  {
    name: 'B2B Reports',
    company_name: 'XYZ Company Incorporated',
    date: 'Dec 17, 2020',
    start_time: '09:30 PM',
    end_time: '11:00 PM',
  },
  {
    name: 'Inspection',
    company_name: 'XYZ Company Incorporated',
    date: 'Dec 20, 2020',
    start_time: '10:00 AM',
    end_time: '11:45 AM',
  },
];
