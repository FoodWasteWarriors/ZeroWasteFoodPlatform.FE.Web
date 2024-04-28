import { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Box, ThemeProvider, CssBaseline, Toolbar } from '@mui/material'
import { useAppSelector } from './utils/hooks/reduxHooks'
import mainTheme from './assets/theme/mainTheme'

import Home from './pages/home/Home'
import About from './pages/about/About'
import Login from './pages/login/Login'
import Contact from './pages/contact/Contact'
import Header from './components/header/Header'
import NotFound from './pages/not-found/NotFound'
import DrawerContainer from './components/drawer-container/DrawerContainer'

import './App.css'

function App() {
  const themeMode = useAppSelector((state) => state.theme.themeMode)
  const theme = useMemo(() => mainTheme(themeMode), [themeMode])
  const drawerWidth = useAppSelector((state) => state.drawer.width)

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
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
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
