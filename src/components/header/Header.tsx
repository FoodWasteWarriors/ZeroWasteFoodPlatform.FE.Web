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
import { toggleDrawer } from '../../store/features/drawer/drawerSlice'
import { logout } from '../../store/features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { width } = useAppSelector((state) => state.drawer)
  const [isAuthenticated] = useAppSelector((state) => [
    state.auth.isAuthenticated,
  ])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleAppNameClick = () => {
    navigate('/')
  }

  const handleThemeDrawer = () => {
    dispatch(toggleDrawer())
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { md: `calc(100% - ${width}px)` },
        ml: { md: `${width}px` },
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
