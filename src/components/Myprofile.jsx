import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

const MyProfile = () => {
  const userId = localStorage.getItem("userId");
  const [myData, setMyData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3008/api/viewmypro/${userId}`)
      .then((res) => setMyData(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);
      axios.post('http://localhost:3008/api/uploadProfilePicture', formData)
        .then((response) => console.log('File uploaded:', response.data))
        .catch((error) => console.error('Upload error:', error));
    }
  };

  return (
    <Box sx={{ margin: '4% 10%', padding: '2%' }}>
      <Grid container spacing={4} justifyContent="center">
        {myData.map((val, i) => (
          <Grid item xs={12} sm={8} md={6} key={i}>
            <Card sx={{ maxWidth: 420, borderRadius: 4, boxShadow: 2, bgcolor: 'background.paper', padding: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    mb: 3,
                    boxShadow: 2,
                  }}
                  src={preview || val.profilePicture || '/default-profile.png'}
                  alt={val.name}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="upload-button"
                  style={{ display: 'none' }}
                />
                <label htmlFor="upload-button">
                  <Button
                    variant="outlined"
                    component="span"
                    color="primary"
                    sx={{ textTransform: 'none', fontSize: '0.9rem', mb: 3 }}
                  >
                    Change Profile Picture
                  </Button>
                </label>

                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                  {val.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Username:</strong> {val.username}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {val.email}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Class:</strong> {val.class}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>College:</strong> {val.college}
                </Typography>
              </CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: 'none', px: 4, borderRadius: 8 }}
                  onClick={handleUpload}
                  startIcon={<Edit />}
                >
                  Save Changes
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyProfile;
