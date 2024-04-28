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
      MuiMenuItem: {
        styleOverrides: {
          root: {
            whiteSpace: 'unset',
            wordBreak: 'break-all',
          },
        },
      },
    },
  })

export default mainTheme
