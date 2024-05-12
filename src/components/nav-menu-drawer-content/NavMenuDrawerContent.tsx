import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loggedInUserActions from '../../constants/loggedInUserActions.tsx'

import { Box } from '@mui/system'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'

import CopyRight from '../copy-right/CopyRight.tsx'
import SwitchThemeMode from '../theme-mode-switch/ThemeModeSwitch.tsx'
import NotLoggedInInfo from '../not-logged-in-info/NotLoggedInInfo.tsx'
import { selectAuthUserType } from '../../store/features/auth/authSelectors.ts'
import { useAppSelector } from '../../utils/hooks/reduxHooks.ts'
import ProfileSection from '../profile-section/ProfileSection.tsx'

function NavMenuDrawerContent() {
  const navigate = useNavigate()
  const [privateMenus, setPrivateMenus] = useState<SideMenuItem[]>([])
  const userType = useAppSelector(selectAuthUserType)

  const handleListItemClick = (to: string) => navigate(to)

  useEffect(() => {
    setPrivateMenus(userType ? loggedInUserActions[userType!] : [])
  }, [userType])

  return (
    <>
      <Toolbar>
        <SwitchThemeMode />
      </Toolbar>
      <Divider />

      {userType && <ProfileSection />}

      <Divider />
      <List>
        {loggedInUserActions.common.map(({ link, to, icon }) => (
          <ListItem
            key={to}
            disablePadding
            onClick={() => handleListItemClick(to)}
          >
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={link} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box flex={1}>
        {userType ? (
          <List>
            {privateMenus.map(({ link, to, icon }) => (
              <ListItem
                key={to}
                disablePadding
                onClick={() => handleListItemClick(to)}
              >
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={link} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <NotLoggedInInfo />
        )}
      </Box>
      <Divider />
      <CopyRight />
    </>
  )
}

export default NavMenuDrawerContent
