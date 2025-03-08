import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, LinearProgress, Dialog, DialogContent, Link } from '@mui/material';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateUsername = (username) => {
    if (!username) return 'Username is required';
    if (username.length < 8) return 'Username must be at least 8 characters long';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasLower || !hasUpper || !hasSpecial) {
      return 'Password must contain at least one lowercase letter, one uppercase letter, and one special character';
    }
    return '';
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const [usernameCheckTimeout, setUsernameCheckTimeout] = useState(null);

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch('http://localhost:5000/api/check-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      const data = await response.json();
      return !data.exists;
    } catch (error) {
      console.error('Error checking username:', error);
      return true; // Assume username is available if request fails
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const newErrors = { ...errors };
    if (name === 'username') {
      newErrors.username = validateUsername(value);
      
      // Clear any existing timeout
      if (usernameCheckTimeout) {
        clearTimeout(usernameCheckTimeout);
      }

      // Set new timeout for username availability check
      if (value.length >= 8 && !newErrors.username) {
        const timeoutId = setTimeout(async () => {
          const isAvailable = await checkUsernameAvailability(value);
          if (!isAvailable) {
            setErrors(prev => ({
              ...prev,
              username: 'Username already exists. Please choose a different one.'
            }));
          }
        }, 500); // Debounce for 500ms
        setUsernameCheckTimeout(timeoutId);
      }
    } else if (name === 'password') {
      newErrors.password = validatePassword(value);
      calculatePasswordStrength(value);
      if (formData.confirmPassword) {
        newErrors.confirmPassword = value !== formData.confirmPassword ? 'Passwords do not match' : '';
      }
    } else if (name === 'confirmPassword') {
      newErrors.confirmPassword = value !== formData.password ? 'Passwords do not match' : '';
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = formData.password !== formData.confirmPassword ? 'Passwords do not match' : '';

    if (usernameError || passwordError || confirmPasswordError) {
      setErrors({
        username: usernameError,
        password: passwordError,
        confirmPassword: confirmPasswordError
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setErrors(prev => ({ ...prev, submit: data.message }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: 'An error occurred. Please try again.' }));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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

      {/* Signup Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          width: '100%',
          mx: 'auto',
          p: 4,
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            mb: 3,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Sign Up
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
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: '1px solid rgba(255, 255, 255, 0.4)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#2196F3',
            },
          }}
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
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: '1px solid rgba(255, 255, 255, 0.4)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#2196F3',
            },
          }}
        />

        {formData.password && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Password Strength:
            </Typography>
            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              sx={{
                mb: 2,
                height: '8px',
                borderRadius: '4px',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 
                    passwordStrength <= 25 ? '#f44336' :
                    passwordStrength <= 50 ? '#ff9800' :
                    passwordStrength <= 75 ? '#ffeb3b' : '#4caf50'
                }
              }}
            />
          </Box>
        )}

        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: '1px solid rgba(255, 255, 255, 0.4)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#2196F3',
            },
          }}
        />

        {errors.submit && (
          <Typography color="error" sx={{ mt: 2, color: '#ff4444', textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
            {errors.submit}
          </Typography>
        )}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            borderRadius: '8px',
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            color: '#fff',
            fontWeight: 'bold',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2, #1E88E5)',
            },
          }}
          disabled={Object.values(errors).some(error => error) || !formData.username || !formData.password || !formData.confirmPassword}
        >
          Sign Up
        </Button>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Already have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/login')}
              sx={{
                color: '#2196F3',
                fontWeight: 'bold',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>

        <Dialog open={showSuccess}>
          <DialogContent>
            <Typography>Signup successful! Redirecting to login page...</Typography>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Signup;1