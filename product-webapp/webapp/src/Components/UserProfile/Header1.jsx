    import * as React from 'react';
    import AppBar from '@mui/material/AppBar';
    import Box from '@mui/material/Box';
    import Toolbar from '@mui/material/Toolbar';
    import Typography from '@mui/material/Typography';
    import Button from '@mui/material/Button';
    import IconButton from '@mui/material/IconButton';
    import MenuIcon from '@mui/icons-material/Menu';
    import IMG from './Images/iconlogo.png'
    export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <img src={IMG} alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Shield Share
            </Typography>
            </Toolbar>
        </AppBar>
        </Box>
    );
    }
