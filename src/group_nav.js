export default {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer',
            // badge: {
            //   variant: 'info',
            //   text: 'NEW',
            // },
        },
        {
            name: 'Manage Members',
            url: '/Users',
            icon: 'icon-user',
            children: [
                {
                    name: 'Register Member',
                    url: '/registerUser/group',
                    icon: 'icon-cursor',
                },
                {
                    name: 'Manage Members',
                    url: '/members/group',
                    icon: 'icon-cursor',
                }
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
        //   title: true,
        //   name: 'User Management',
        //   wrapper: {            // optional wrapper object
        //     element: '',        // required valid HTML5 element tag
        //     attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        //   },
        //   class: ''             // optional class names space delimited list for title item ex: "text-center"
        // },
        {
            name: 'Ledgers',
            url: '/ledgers',
            icon: 'icon-cursor',
            children: [
                {
                    name: 'Add Ledgers',
                    url: '/ledgers',
                    icon: 'icon-cursor',
                },
                {
                    name: 'View Ledgers',
                    url: '/buttons/button-dropdowns',
                    icon: 'icon-cursor',
                },
            ],
        },
        
        {
            name: 'System Settings',
            url: '/theme/typography',
            icon: 'icon-settings',
        },
    ],


};
