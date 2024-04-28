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

import './Header.css'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks'
import { toggleDrawer } from '../../store/features/drawer/drawerSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { width } = useAppSelector((state) => state.drawer)

  // TODO: Get user type from redux store
  const userType = ''

  const handleLogout = () => {
    // TODO: Implement logout
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

        {userType == '' ? (
          <Button color='inherit' size='large' onClick={handleLogin}>
            Login
          </Button>
        ) : (
          <Button color='inherit' size='large' onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
