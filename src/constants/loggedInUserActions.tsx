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
  globalAdmin: [] as SideMenuItem[],
  business: [] as SideMenuItem[],
  customer: [] as SideMenuItem[],
}

export default loggedInUserActions
