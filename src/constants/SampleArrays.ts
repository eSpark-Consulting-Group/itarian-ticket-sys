export type Companines = {
  name: string;
  address: string;
  employees?: number | null;
};

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
