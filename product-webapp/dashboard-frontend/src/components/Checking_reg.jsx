import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundImage from '../images/Untitled.png'; // Your background image path
import axios from 'axios';
const defaultTheme = createTheme();
export default function Register() {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    // Basic validation
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    // Email validation
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    } else {
      setEmailError('');
    }
    // Password validation
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError('Password must contain at least one special character');
      return;
    } else {
      setPasswordError('');
    }
    // Proceed with form submission or further actions
    console.log({
      username,
      email,
      password,
    });
    const response = await axios.post('http://localhost:8096/user-service/register', {
      userName: username,
      emailId: email,
      password: password,
    });
    console.log(response.data);
    alert(response.data);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BackgroundImage})`, // Set your custom background image here
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            borderRadius: '20px', // Adjust border radius to make it circular rectangle
            overflow: 'hidden', // Hide overflowing content
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px', // Adjust padding as needed
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: '50px', height: '50px' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, alignItems: 'center' }}
            >
              <TextField
                margin="normal"
                required
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                sx={{ marginBottom: '10px', width: '400px', left: '90px' }} // Adjust marginBottom as needed
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!emailError}
                helperText={emailError}
                sx={{ marginBottom: '10px', width: '400px', left: '90px' }} // Adjust marginBottom as needed
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!passwordError}
                helperText={passwordError}
                sx={{ marginBottom: '10px', width: '400px', left: '90px' }} // Adjust marginBottom as needed
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '300px', left: '150px' }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" variant="body2">
                    {'Already have an account? Login'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
        </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}







