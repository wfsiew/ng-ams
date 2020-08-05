export const MenuMiningHQ = {

  company_details: [
    'company-details'
  ],
  delivery_order_list: [
    'delivery-order/list'
  ],
  buyer_list: [
    'buyer/list',
    'buyer/create',
    'buyer/edit',
    'buyer/truck',
    'buyer/driver',
    'buyer/user'
  ],
  purchase_order_list: [
    'purchase-order/list',
    'purchase-order/create',
    'purchase-order/detail'
  ]
};

export const SubmenuMiningHQ = [
  {
    title: 'Company Details',
    path: 'company-details',
    icon: 'fas fa-home'
  },
  {
    title: 'Purchase Order',
    path: 'purchase-order/list',
    icon: 'fas fa-shopping-cart'
  },
  {
    title: 'Delivery Order',
    path: 'delivery-order/list',
    icon: 'fas fa-truck-moving'
  },
  {
    title: 'Buyer',
    path: 'buyer/list',
    icon: 'far fa-circle'
  }
];
