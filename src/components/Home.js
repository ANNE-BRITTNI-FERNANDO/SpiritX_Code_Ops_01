import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, AppBar, Toolbar, Container } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Video Background */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src="/smoke.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Box>

      {/* AppBar */}
      <AppBar
        position="static"
        sx={{
          background: 'rgba(0, 0, 0, 0.3)',
          boxShadow: 'none',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              padding: '8px 24px',
              borderRadius: '20px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        sx={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
            textShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
            background: 'linear-gradient(45deg, #00ff88, #00b8ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Hello, {username}!
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          Welcome to <span style={{ fontWeight: 'bold', color: '#00ff88' }}>SecureConnect</span>.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: '600px',
            lineHeight: '1.6',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.1rem',
          }}
        >
          You are now logged in. Explore the platform and enjoy a seamless experience with cutting-edge security and modern design.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;