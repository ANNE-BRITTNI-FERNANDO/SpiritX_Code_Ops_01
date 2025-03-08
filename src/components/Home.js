import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, AppBar, Toolbar } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Hello, {username}!
        </Typography>
        <Typography variant="body1">
          Welcome to SecureConnect. You are now logged in.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;