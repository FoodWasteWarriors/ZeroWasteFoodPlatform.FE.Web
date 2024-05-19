import { Box, CssBaseline, ThemeProvider, Toolbar } from '@mui/material'
import { useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import mainTheme from './assets/theme/mainTheme'
import Header from './components/header/Header'
import DrawerContainer from './components/nav-menu-drawer-container/NavMenuDrawerContainer'
import Login from './pages/login/Login'
import NotFound from './pages/not-found/NotFound'
import MainPage from './pages/main-page/MainPage'
import Store from './pages/store/Store'
import { selectNavMenuDrawer } from './store/features/nav-menu-drawer/navMenuDrawerSelectors'
import { selectThemeMode } from './store/features/theme/themeSelectors'
import { useAppSelector } from './utils/hooks/reduxHooks'
import ShoppingList from './pages/shopping-list/ShoppingList'
import { IsAuthorized } from './utils/helpers/authHelper'
import UserProfile from './pages/user-profile/UserProfile'
import EditProduct from './pages/edit-product/EditProduct'
import Register from './pages/register/Register'

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
          <Box>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route
                path='/profile/:userId'
                element={
                  IsAuthorized('/profile/:userId') ? (
                    <UserProfile />
                  ) : (
                    <Navigate to='/login' />
                  )
                }
              />
              <Route path='/store/:storeId' element={<Store />} />
              <Route path='/my-products' element={<Store />} />
              <Route
                path='/edit-product/:productId'
                element={<EditProduct />}
              />
              <Route
                path='/shopping-list'
                element={
                  IsAuthorized('/shopping-list') ? (
                    <ShoppingList />
                  ) : (
                    <Navigate to='/login' />
                  )
                }
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
