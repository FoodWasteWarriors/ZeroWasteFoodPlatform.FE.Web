import { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box, ThemeProvider, CssBaseline, Toolbar } from '@mui/material'
import { useAppSelector } from './utils/hooks/reduxHooks'
import mainTheme from './assets/theme/mainTheme'

import StoreProducts from './pages/store-products/StoreProducts'
import Login from './pages/login/Login'
import Header from './components/header/Header'
import NotFound from './pages/not-found/NotFound'
import DrawerContainer from './components/nav-menu-drawer-container/NavMenuDrawerContainer'

import './App.scss'
import { selectNavMenuDrawer } from './store/features/nav-menu-drawer/navMenuDrawerSelectors'
import { selectThemeMode } from './store/features/theme/themeSelectors'

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = useMemo(() => mainTheme(themeMode), [themeMode])
  const drawerWidth = useAppSelector(selectNavMenuDrawer)

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <DrawerContainer />

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Box sx={{ p: 3 }}>
            <Routes>
              <Route path='/' element={<StoreProducts />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<NotFound />} />
            </Routes>{' '}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
