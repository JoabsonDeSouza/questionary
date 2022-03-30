import { createTheme } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    background: {
      default: '#222222'
    },
    primary: green,
    secondary: red,
    text: {
      primary: '#000',
      secondary: '#fff'
    }
  },
  typography: {
    button: {
      color: 'white'
    },
    allVariants: {
      color: 'gray'
    }
  }
})

export default theme
