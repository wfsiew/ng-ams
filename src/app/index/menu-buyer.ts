export const MenuBuyer = {
  
  company_details: [
    'company-details'
  ],
  truck_list: [
    'truck/list',
    'truck/create',
    'truck/edit'
  ],
  driver_list: [
    'driver/list',
    'driver/create',
    'driver/edit'
  ],
  purchase_order_list: [
    'purchase-order/list',
    'purchase-order/create',
    'purchase-order/detail'
  ]
};

export const SubmenuBuyer = [
  {
    title: 'Company Details',
    path: 'company-details',
    icon: 'fas fa-home'
  },
  {
    title: 'Trucks',
    path: 'truck/list',
    icon: 'fas fa-truck'
  },
  {
    title: 'Drivers',
    path: 'driver/list',
    icon: 'fas fa-id-card'
  },
  {
    title: 'Purchase Order',
    path: 'purchase-order/list',
    icon: 'fas fa-shopping-cart'
  }
];
