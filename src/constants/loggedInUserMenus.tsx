import { Assessment, Favorite, ProductionQuantityLimits, Store } from '@mui/icons-material'

const loggedInUserMenus = {
  // Menu items that do not require authentication
  common: [
    {
      link: 'Market',
      to: '/',
      icon: <Store />
    }
  ],
  Admin: [
    {
      link: 'Reports',
      to: '/reports',
      icon: <Assessment />
    }
  ],
  Business: [
    {
      link: 'My Products',
      to: '/my-products',
      icon: <ProductionQuantityLimits />
    }
  ] as SideMenuItem[],
  Customer: [
    {
      link: 'Shopping List',
      to: '/shopping-list',
      icon: <Favorite />
    },
    {
      link: 'Monitored Products',
      to: '/monitored-products',
      icon: <ProductionQuantityLimits />
    }
  ] as SideMenuItem[]
}

export default loggedInUserMenus
