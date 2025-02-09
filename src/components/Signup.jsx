/*import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs);
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = () => {
    if (!validateEmail(inputs.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log("btn clicked", inputs);

    axios.post("http://localhost:3008/api/post", inputs)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        if (res.data.success) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          padding: 4,
          maxWidth: 800,
          borderRadius: 9,
          boxShadow: 4,
          backgroundColor: 'background.paper',
        }}
      >
        <div style={{ margin: '10%' }}>
          <Typography variant='h4' style={{ color: "red" }}>
            SIGNUP
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                variant='outlined'
                label="Name"
                fullWidth
                name='name'
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                variant='outlined'
                label="Email"
                fullWidth
                name='email'
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                variant='outlined'
                label="Address"
                fullWidth
                multiline
                rows={5}
                name='address'
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                variant='outlined'
                label="Username"
                fullWidth
                name='username'
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                variant='outlined'
                label="Password"
                fullWidth
                name='password'
                type='password'
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button variant='contained' color='error' onClick={submitHandler}>
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Link to={'/'}>Back to login</Link>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Box>
  )
}

export default Signup*/


import { Box, Button, Grid,  TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs);
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = () => {
    if (!validateEmail(inputs.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log("btn clicked", inputs);

    axios.post("http://localhost:3008/api/post", inputs)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        if (res.data.success) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          padding: 4,
          maxWidth: 800,
          borderRadius: 9,
          boxShadow: 4,
          backgroundColor: 'background.paper',
        }}
      >
        <div style={{ margin: '10%' }}>
          <Typography variant='h4' style={{ color: "red" }}>
            SIGNUP
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                variant='outlined'
                label="Name"
                fullWidth
                name='name'
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                variant='outlined'
                label="Email"
                fullWidth
                name='email'
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
              variant='outlined'
              label="Phone number"
              fullWidth
              name='phoneno'
              value={inputs.phoneno || ''}  // Ensures the value is controlled
              onChange={inputHandler}
              onInput={(e) => {
              // Only allow digits (0-9)
              e.target.value = e.target.value.replace(/\D/g, '');  // RegEx to replace non-digit characters
                }}
             />
           </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                variant='outlined'
                label="class"
                fullWidth
                rows={5}
                name='class'
                onChange={inputHandler}
              />          
            </Grid>
             
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                variant='outlined'
                label="college"
                fullWidth
                rows={5}
                name='college'
                onChange={inputHandler}
              />          
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <TextField
                variant='outlined'
                label="Username"
                fullWidth
                name='username'
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                variant='outlined'
                label="Password"
                fullWidth
                name='password'
                type='password'
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button variant='contained' color='error' onClick={submitHandler}>
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Link to={'/'}>Back to login</Link>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Box>
  )
}

export default Signup

