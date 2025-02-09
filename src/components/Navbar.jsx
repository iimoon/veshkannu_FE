import React, { useEffect } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Token not found. Please log in.', { position: 'top-center' });
      navigate('/adminlogin');
    } else {
      try {
        const decoded = jwtDecode(token);
        if (!decoded.isAdmin) {
          toast.warning('Unauthorized access. Admin only.', { position: 'top-center' });
          navigate('/adminlogin');
        }
      } catch (error) {
        console.error('Failed to decode token', error);
        toast.error('Invalid token. Please log in again.', { position: 'top-center' });
        navigate('/adminlogin');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Successfully logged out!', { position: 'top-center' });
    setTimeout(() => navigate('/adminlogin'), 1500);
  };

  return (
    <div style={{ zIndex: 0 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#EF4F5F',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '0 2rem',
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              gap: isMobile ? 1 : 0,
            }}
          >
            {/* Logo Section */}
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              <span style={{ marginRight: '8px' }}>
                <img
                  src="veshkunnu.webp"
                  alt="Veshkunnu Logo"
                  style={{ height: '50px', verticalAlign: 'middle' }}
                />
              </span>
              VESHKUNNU <span style={{ fontWeight: 500, color: 'pink' }}>@admin</span>
            </Typography>

            {/* Menu Items Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: isMobile ? 'flex-start' : 'space-between',
                width: isMobile ? '100%' : 'auto',
                gap: 2,
                marginTop: isMobile ? 1 : 0,
              }}
            >
              {['/add', '/view', '/viewUserOrders', '/dashboard'].map((path, index) => {
                const labels = ['Add Items', 'Menu', 'Orders', 'Dashboard'];
                return (
                  <Button key={index}>
                    <Link
                      to={path}
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '600',
                        fontSize: '16px',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {labels[index]}
                    </Link>
                  </Button>
                );
              })}
              <Button onClick={handleLogout}>
                <Typography
                  sx={{
                    color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '600',
                    fontSize: '16px',
                  }}
                >
                  Log Out
                </Typography>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
