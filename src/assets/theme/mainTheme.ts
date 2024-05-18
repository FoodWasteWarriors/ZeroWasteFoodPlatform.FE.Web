import { createTheme } from '@mui/material'
import { blue, lightBlue, pink } from '@mui/material/colors'

const primaryColor = blue[500]
const PrimaryColorLightMode = blue[500]
const PrimaryColorDarkMode = blue[900]

const secondaryColor = pink[500]
const SecondaryColorLightMode = pink[400]
const SecondaryColorDarkMode = pink[900]

const mainTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
        light: PrimaryColorLightMode,
        dark: PrimaryColorDarkMode,
        contrastText: '#fff',
      },
      secondary: {
        main: secondaryColor,
        light: SecondaryColorLightMode,
        dark: SecondaryColorDarkMode,
        contrastText: '#fff',
      },
      info: {
        main: lightBlue['500'],
        light: lightBlue['300'],
        dark: lightBlue['900'],
        contrastText: '#fff',
      },
    },

    components: {
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontSize: '4rem',
          },
          h2: {
            fontSize: '3rem',
          },
          h3: {
            fontSize: '2.2rem',
          },
          h4: {
            fontSize: '1.7rem',
          },
          h5: {
            fontSize: '1.4rem',
          },
          h6: {
            fontSize: '1.2rem',
          },
          body1: {
            fontSize: '1rem',
          },
          body2: {
            fontSize: '0.8rem',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            width: '100%',
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          item: {
            padding: '8px !important',
          },
        },
      },
    },
  })

export default mainTheme
