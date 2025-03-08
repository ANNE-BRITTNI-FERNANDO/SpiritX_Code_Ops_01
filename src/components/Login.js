import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Link } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateUsername = (username) => {
    if (!username) return 'Username is required';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const newErrors = { ...errors };
    if (name === 'username') {
      newErrors.username = validateUsername(value);
    } else if (name === 'password') {
      newErrors.password = validatePassword(value);
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);

    if (usernameError || passwordError) {
      setErrors({
        username: usernameError,
        password: passwordError
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', formData.username);
        navigate('/');
      } else {
        setErrors(prev => ({ ...prev, submit: data.message }));
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({ ...prev, submit: 'Unable to connect to the server. Please try again.' }));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />

      {errors.submit && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errors.submit}
        </Typography>
      )}

      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!formData.username || !formData.password}
      >
        Login
      </Button>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2">
          Don't have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;