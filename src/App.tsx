import AppContainer from './ui/index';
import './styles/App.scss';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: "'Cormorant Garamond', serif",
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppContainer />
  </ThemeProvider>
);

export default App;
