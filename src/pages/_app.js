import '@/styles/globals.css';
import { ReduxProvider } from '@/redux/provider';
import Header from './Header';
import { Box } from '@mui/material';
import Footer from './Footer';

export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <Box sx={{ flex: 1, pb: '64px' }}> 
          <Component {...pageProps} />
        </Box>
      </Box>
    </ReduxProvider>
  );
}
