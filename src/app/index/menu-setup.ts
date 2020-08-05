export const MenuSetup = {

  user_list: [
    'user/list',
    'user/create',
    'user/edit'
  ],
  mining_list: [
    'mining-company/list',
    'mining-company/create',
    'mining-company/edit',
    'mining-company/user'
  ],
  buyer_list: [
    'buyer/list',
    'buyer/create',
    'buyer/edit',
    'buyer/truck',
    'buyer/driver',
    'buyer/user'
  ],
  material_list: [
    'material/list',
    'material/create',
    'material/edit'
  ],
  country_list: [
    'country/list',
    'country/create',
    'country/edit'
  ],
  state_list: [
    'state/list',
    'state/create',
    'state/edit'
  ]
};

export const SubmenuSetup = [
  {
    title: 'User',
    path: 'user/list'
  },
  {
    title: 'Mining Company',
    path: 'mining-company/list'
  },
  {
    title: 'Buyer',
    path: 'buyer/list'
  },
  {
    title: 'Material',
    path: 'material/list'
  },
  {
    title: 'Country',
    path: 'country/list'
  },
  {
    title: 'State',
    path: 'state/list'
  }
];
