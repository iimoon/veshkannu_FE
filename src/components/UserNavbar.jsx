import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Drawer, List, ListItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {jwtDecode} from 'jwt-decode';

const UserNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login if no token
    } else {
      try {
        const decoded = jwtDecode(token);
        if (!decoded.userId) {
          localStorage.removeItem('token');
          navigate('/userlogin');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        navigate('/userlogin');
      }
    }
  }, [navigate]);

  const navLinks = [
    { title: 'Menu', path: '/userview' },
    { title: 'My Orders', path: '/myorder' },
    { title: 'My Profile', path: '/my' },
    { title: 'Log Out', path: '/' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/userlogin'); // Redirect to login after logout
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const renderLinks = () =>
    navLinks.map((link) => (
      <ListItem key={link.title} sx={{ textAlign: 'center' }}>
        {link.title === 'Log Out' ? (
          <Button onClick={handleLogout} sx={linkStyle}>
            {link.title}
          </Button>
        ) : (
          <Link to={link.path} style={linkStyle}>
            {link.title}
          </Link>
        )}
      </ListItem>
    ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: '#EF4F5F',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '0 2rem',
          marginBottom: '20px',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo Section */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'Poppins, sans-serif',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img src="veshkunnu.webp" alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
            VESHKUNNU
          </Typography>

          {/* Desktop Menu */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: '20px' }}>
              {navLinks.map((link) =>
                link.title === 'Log Out' ? (
                  <Button key={link.title} onClick={handleLogout}>
                    <span style={desktopLinkStyle}>{link.title}</span>
                  </Button>
                ) : (
                  <Button key={link.title}>
                    <Link to={link.path} style={desktopLinkStyle}>
                      {link.title}
                    </Link>
                  </Button>
                )
              )}
            </Box>
          ) : (
            // Mobile Menu Icon
            <IconButton edge="end" onClick={toggleDrawer(true)}>
              <MenuIcon style={{ color: 'white' }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, paddingTop: '1rem' }} role="presentation" onClick={toggleDrawer(false)}>
          <List>{renderLinks()}</List>
        </Box>
      </Drawer>
    </Box>
  );
};

// Link styling for desktop and mobile
const desktopLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: '600',
  fontSize: '16px',
  transition: 'color 0.3s ease',
};

const linkStyle = {
  color: '#000000',
  textDecoration: 'none',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: '500',
  fontSize: '16px',
  padding: '10px 15px',
  display: 'block',
};

export default UserNavbar;
