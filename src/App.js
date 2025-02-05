import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import RichTextEditor from './components/RichTextEditor';
import Dashboard from './components/Dashboard';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'rgb(59, 31, 143)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
          height: '50px',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            '@media (max-width: 600px)': {
              flexDirection: 'row', // Ensure items stay in a row for mobile
              justifyContent: 'center', // Horizontally center items
              alignItems: 'center', // Vertically center items
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'nowrap', // Prevent wrapping of items
              '@media (max-width: 600px)': {
                gap: '10px', // Smaller gap on mobile
              },
            }}
          >
            {[
              { to: '/counter', label: 'Counter', mobileLabel: 'Counter' },
              { to: '/user-form', label: 'User Data Form', mobileLabel: 'Form' },
              { to: '/rich-text-editor', label: 'Rich Text Editor', mobileLabel: 'Editor' },
              { to: '/dashboard', label: 'Dashboard', mobileLabel: 'Dashboard' },
            ].map((item) => (
              <Button
                key={item.to}
                component={Link}
                to={item.to}
                sx={{
                  color: 'white',
                  fontSize: '16px',
                  fontFamily: 'Afacad, sans-serif',
                  textTransform: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgb(75, 61, 121)',
                    transform: 'scale(0.95)', // Slightly decrease size on hover
                  },
                  '@media (max-width: 600px)': {
                    fontSize: '14px', // Smaller font on mobile
                    padding: '8px 15px', // Adjust padding for mobile
                    '&:hover': {
                      transform: 'none', // Disable hover effect for mobile
                    },
                  },
                }}
              >
                {window.innerWidth <= 600 ? item.mobileLabel : item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/rich-text-editor" element={<RichTextEditor />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
