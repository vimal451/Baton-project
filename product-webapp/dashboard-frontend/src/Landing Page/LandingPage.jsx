import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Slogo from "./Images/ShieldShareLogo.png";
import SideImage from "./Images/FileShare1.png";
import './styles.css'; // Import CSS file for animations

function LandingPage() {
  return (
    <Box sx={{ background: "linear-gradient(45deg, #27374D 50%, #DDE6ED 50%)", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <Toolbar disableGutters>
          <img
            src={Slogo}
            style={{ width: "auto", height: "100px" }}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              component={Link} // Use Link component
              to="/login" // Navigate to login page
              sx={{ color: "#27374D", marginRight: '8px', borderColor: "#27374D" }} // Added margin for distance
            >
              Sign in
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              component={Link} // Use Link component
              to="/signup" // Navigate to register page
              sx={{ color: "white", bgcolor: "#27374D", marginRight: '50px'}} // Changed text color to white
            >
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ position: "relative", height: "100%" }}>
          <Box sx={{ position: "absolute", left: "0%", top: "20vh",bottom:"30px", transform: "translateX(100%)", transform: "translateY(90%)" }}>
          <Typography variant="h1" sx={{ fontWeight: 'bold', color: "white", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
              Welcome
        <Typography variant="h6" sx={{color: "white", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
         "Share Files Securely and Seamlessly" </Typography>
        </Typography>
          <Button
              color="primary"
              variant="contained"
              size="small"
              component={Link} // Use Link component
              to="/signup" // Navigate to register page
              sx={{ borderRadius:"100px",color: "#27374D", bgcolor: "#DDE6ED", marginRight: '50px',ml:"140px",mt:"50px",width:"100px",height:'60px'}} // Changed text color to white
            >
              Sign up
            </Button>
        </Box>
        <Box sx={{ position: "absolute", right: "0", bottom: "", bgcolor:"" }}>
          <img
            src={SideImage}
            style={{ width: "auto", height: "400px" }}
            className="floating-image" // Add class for animation
          />
        </Box>
      </Container>
    </Box>
  );
}

export default LandingPage;
