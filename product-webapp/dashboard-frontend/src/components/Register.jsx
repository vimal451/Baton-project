import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundImage from '../images/Untitled.png'; // Your background image path
import axios from 'axios';
import Slogo from '../images/ShieldShareLogo.png'; // Import your logo image
import SOlogo from "../images/ShieldShareLogoOnlyWhite.png"

const defaultTheme = createTheme();
export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [exc, setExc]  = React.useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    // Basic validation
    if (!username || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
     // Email validation
     if (!email.includes('@') || email.split('@')[1].indexOf('.') === -1) {
      setEmailError('Please enter a valid email address');
      return;
    } else {
      setEmailError('');
    }
    // Password validation
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //   setPasswordError('Password must contain at least one special character');
    //   return;
    // } else {
    //   setPasswordError('');
    // }
    if (password.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return;
    } else {
      setPasswordError('');
    }
    
    if (password.length > 20) {
      setPasswordError('New password must be less than 20 characters');
      return;
    } else {
      setPasswordError('');
    }
    
    if (!/[a-z]/.test(password)) {
      setPasswordError('New password must contain at least one lowercase letter');
      return;
    } else {
      setPasswordError('');
    }
    
    if (!/[A-Z]/.test(password)) {
      setPasswordError('New password must contain at least one uppercase letter');
      return;
    } else {
      setPasswordError('');
    }
    
    if (!/\d/.test(password)) {
      setPasswordError('New password must contain at least one number');
      return;
    } else {
      setPasswordError('');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError('New password must contain at least one special character');
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
    try {
      const response = await axios.post('http://localhost:8095/user-service/register', {
        userName: username,
        emailId: email,
        password: password,
      });
      console.log(response.data);
      alert(response.data);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      setExc(error.response.data)
      if(exc==="[object Object]")
      setExc("Username Already Exists")
      error.response.data
      // alert(`${error.response.data}`);
      alert(exc)
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0)), url(${BackgroundImage})`, // Use your own background image
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <CssBaseline />
        <div>
          <Paper elevation={6} square sx={{borderRadius: '20px', width:'80vh', height:'95vh', mb:'60px', ml:'700px'}}>
            <Box
              sx={{
                my: 8,
                mx: 'auto', // Center horizontally
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 4,
                borderRadius: '10px', // Adding border radius to the containing box
              }}
            >
              <Link to="/">
              <img src={Slogo} alt="Logo" style={{ width: 'auto', height: 100, position: 'absolute', top: 20, left: 20 }} />
              {/* <Avatar sx={{ m: 1, bgcolor: '#526D82' }}>
                <LockOutlinedIcon />
              </Avatar> */}
              </Link>
              <Avatar sx={{ m: 1, bgcolor: '#526D82' }}>
                <img src={SOlogo} style={{ width: '100%', height: 'auto' }}/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  sx={{ borderRadius: '10px', mb: 2 }} // Adding border radius and margin bottom
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
                  sx={{ borderRadius: '10px', mb: 2 }} // Adding border radius and margin bottom
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
                  sx={{ borderRadius: '10px', mb: 2 }} // Adding border radius and margin bottom
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ height: '50px', width:'150px', mb: 2 ,backgroundColor: '#27374D'}} // Adjust height, width, and margin bottom here
                >
                  Register
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                      Forgot password?
                    </Link> */}
                  </Grid>
                  <Grid item>
                    <Link to="/login" variant="body2">
                      {'Already have an account? Login'}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </div>
      </Box>
    </ThemeProvider>
  );
}