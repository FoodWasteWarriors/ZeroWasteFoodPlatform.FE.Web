import { Store } from '@mui/icons-material'

const loggedInUserActions = {
  // Menu items that do not require authentication
  common: [
    {
      link: 'Store Products',
      to: '/',
      icon: <Store />,
    },
  ] as SideMenuItem[],
  Admin: [] as SideMenuItem[],
  Business: [] as SideMenuItem[],
  Customer: [] as SideMenuItem[],
}

export default loggedInUserActions
