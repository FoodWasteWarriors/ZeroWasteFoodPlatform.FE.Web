import { Favorite, Store } from '@mui/icons-material'

const loggedInUserMenus = {
  // Menu items that do not require authentication
  common: [
    {
      link: 'Market',
      to: '/',
      icon: <Store />,
    },
  ] as SideMenuItem[],
  Admin: [] as SideMenuItem[],
  Business: [
    {
      link: 'My Products',
      to: '/my-products',
      icon: <Store />,
    },
  ] as SideMenuItem[],
  Customer: [
    {
      link: 'Shopping List',
      to: '/shopping-list',
      icon: <Favorite />,
    },
  ] as SideMenuItem[],
}

export default loggedInUserMenus
