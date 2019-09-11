export default {
  items: [
    {
      name: 'Dashboard',
      url: '/management/dashboard',
      icon: 'icon-speedometer',
      // badge: {
      //   variant: 'info',
      //   text: 'NEW',
      // },
    },
      {
          name: 'Group Management',
          url: '/ledgers',
          icon: 'icon-cursor',
          children: [
              {
                  name: 'Add Group',
                  url: '/groups',
                  icon: 'icon-cursor',
              },
              {
                  name: 'View Group',
                  url: '/buttons/button-dropdowns',
                  icon: 'icon-cursor',
              },
          ],
      },
      {
        name: 'Loan Management',
        url: '/loans',
        icon: 'fa fa-money',
        children: [
          {
            name: 'Grant Loan',
            url: '/grant',
            icon: 'icon-cursor',
          },
          {
            name: 'Receive Loan',
            url: '/receive',
            icon: 'icon-cursor',
          },
        ],
      },
      // {
      //   name: 'Ledgers',
      //   url: '/ledgers',
      //   icon: 'icon-cursor',
      //   children: [
      //     {
      //       name: 'Add Ledgers',
      //       url: '/ledgers',
      //       icon: 'icon-cursor',
      //     },
      //     {
      //       name: 'View Ledgers',
      //       url: '/buttons/button-dropdowns',
      //       icon: 'icon-cursor',
      //     },
      //   ],
      // },
    {
      name: 'System Settings',
      url: '/theme/typography',
      icon: 'icon-settings',
    },
  ],
};
