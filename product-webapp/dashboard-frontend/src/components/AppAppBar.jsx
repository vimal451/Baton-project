import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SWhitelogo from "../images/ShieldShareLogoWhite.png"
import UserIcon from "../images/usericon.jpeg"
import { Link } from 'react-router-dom';


const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{bgcolor:"#27374D",  borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img
          src={SWhitelogo}
          style={{ width: "auto", height: "60px", marginRight: '0px'  }}
          sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
        />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Icon" src={UserIcon} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem key="Dashboard"
 component={Link}
 to="/dashboard"
  primaryText="Dashboard"
><Typography textAlign="center">Home</Typography></MenuItem>
                            <MenuItem key="Profile"
  // containerElement={<Link to="/user" />}
  component={Link}
  to="/user"
  primaryText="Profile"
><Typography textAlign="center">Profile</Typography></MenuItem>
<MenuItem key="Logout"
 component={Link}
 to="/logout"
  primaryText="Logout"
><Typography textAlign="center">Logout</Typography></MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

