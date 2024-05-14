import { Box, CssBaseline, ThemeProvider, Toolbar } from '@mui/material'
import { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'

import mainTheme from './assets/theme/mainTheme'
import Header from './components/header/Header'
import DrawerContainer from './components/nav-menu-drawer-container/NavMenuDrawerContainer'
import Login from './pages/login/Login'
import NotFound from './pages/not-found/NotFound'
import StoreProducts from './pages/main-page/MainPage'
import Store from './pages/store/Store'
import { selectNavMenuDrawer } from './store/features/nav-menu-drawer/navMenuDrawerSelectors'
import { selectThemeMode } from './store/features/theme/themeSelectors'
import { useAppSelector } from './utils/hooks/reduxHooks'

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = useMemo(() => mainTheme(themeMode), [themeMode])
  const drawerWidth = useAppSelector(selectNavMenuDrawer)

  return (
    <ThemeProvider theme={theme}>
      <Box display='flex'>
        <CssBaseline />
        <Header />
        <DrawerContainer />

        <Box
          component='main'
          flexGrow={1}
          width={{ sm: `calc(100% - ${drawerWidth}px)` }}
        >
          <Toolbar />
          <Box p={3}>
            <Routes>
              <Route path='/' element={<StoreProducts />} />
              <Route path='/login' element={<Login />} />
              <Route path='/store/:storeId' element={<Store />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
