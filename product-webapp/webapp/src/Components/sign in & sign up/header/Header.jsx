import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Import your logo image file
import Logo from '../images/6843074_certified_insurance_protection_protective_iconfinder-svg.png'; // Update the path to your logo file

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#24A0ED', height: '70px' }}> {/* Update background color here */}
        <Toolbar>
          {/* Logo */}
          <img src={Logo} alt="ShieldShare Logo" style={{ height: '60px', marginRight: '16px', borderRadius: '50%' }} />

          {/* App name */}
          <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', color: '#fff', fontSize: '24px', fontWeight: 'bold', flexGrow: 1 }}>
            ShieldShare
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
