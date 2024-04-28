import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import ContactMailIcon from '@mui/icons-material/ContactMail'

const loggedInUserActions = {
  // Menu items that do not require authentication
  common: [
    {
      link: 'Home',
      to: '/',
      icon: <HomeIcon />,
    },
    {
      link: 'About',
      to: '/about',
      icon: <InfoIcon />,
    },
    {
      link: 'Contact',
      to: '/contact',
      icon: <ContactMailIcon />,
    },
  ] as SideMenuItem[],
  globalAdmin: [] as SideMenuItem[],
  business: [] as SideMenuItem[],
  customer: [] as SideMenuItem[],
}

export default loggedInUserActions
