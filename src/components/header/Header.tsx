import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'

import { applicationName } from '../../constants/navbarConstants'

import './Header.scss'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import { toggleNavMenuDrawer } from '../../store/features/nav-menu-drawer/navMenuDrawerSlice'
import { logout } from '../../store/features/auth/authSlice'
import { selectAuthIsAuthenticated } from '../../store/features/auth/authSelectors'

function Header() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { width } = useAppSelector((state) => state.navMenuDrawer)
  const isAuthenticated = useAppSelector(selectAuthIsAuthenticated)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleAppNameClick = () => {
    navigate('/')
  }

  const handleThemeDrawer = () => {
    dispatch(toggleNavMenuDrawer())
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { md: `calc(100% - ${width}px)` },
        ml: { md: `${width}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleThemeDrawer}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box flexGrow={1}>
          <Typography
            variant='h6'
            noWrap
            component='h1'
            onClick={handleAppNameClick}
            sx={{ cursor: 'pointer', display: 'inline' }}
          >
            {applicationName}
          </Typography>
        </Box>

        {isAuthenticated ? (
          <>
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color='inherit' onClick={handleLogin}>
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
