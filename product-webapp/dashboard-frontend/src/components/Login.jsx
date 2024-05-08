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
import loginBackground from '../images/Untitled.png'; // Import your background image
import axios from 'axios';
import Slogo from '../images/ShieldShareLogo.png'; // Import your logo image
import SOlogo from "../images/ShieldShareLogoOnlyWhite.png"
const defaultTheme = createTheme();
export default function Login() {
  console.log(localStorage.getItem("token"))
  const navigate = useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    try {
      const response = await axios.post("http://localhost:8095/user-service/login",{
        emailId: data.get('email'),
        password: data.get('password')
      });
      console.log(response.data);
      // alert("Login Successfull")
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("emailId", response.data.emailId)
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
      // console.log(localStorage.getItem("token"))
      // alert(`Bearer ${localStorage.getItem("token")}`)
      navigate("/dashboard");
    } catch(error) {
      alert("Wrong Credentials");
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
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0)), url(${loginBackground})`, // Use your own background image
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <CssBaseline />
        <div>
          <Paper elevation={6} square sx={{borderRadius: '20px',width:'80vh',height:'95vh',mb:'60px',ml:'700px'}}>
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
                Sign in 
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                  autoComplete="current-password"
                  sx={{ borderRadius: '10px', mb: 2 }} // Adding border radius and margin bottom
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ height: '50px', width:'150px', mb: 2 ,backgroundColor: '#27374D'}} // Adjust height, width, and margin bottom here
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                      Forgot password?
                    </Link> */}
                  </Grid>
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
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