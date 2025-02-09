import { Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const AddBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', post: '', image: '', price: '', stock: '' });

  useEffect(() => {
    if (location.state) {
      const { val } = location.state;
      setPost({
        title: val.title,
        post: val.post,
        image: val.image,
        price: val.price,
        stock: val.stock,
      });
    } else {
      setPost({ title: '', post: '', image: '', price: '', stock: '' });
    }
  }, [location.state]);

  const inputHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const addPost = async () => {
    try {
      if (location.state) {
        const upId = location.state.val._id;
        const res = await axios.put(`http://localhost:3008/api/edit/${upId}`, post);
        toast.success('🚀 Blog updated successfully!', { position: 'top-center' });
        setTimeout(() => navigate('/view'), 1500);
      } else {
        const res = await axios.post('http://localhost:3008/api/addblog', post);
        toast.success('🎉 Blog added successfully!', { position: 'top-center' });
        setTimeout(() => navigate('/view'), 1500);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('❌ All fields are required!', { position: 'top-center' });
      } else {
        toast.error('❌ Something went wrong. Please try again!', { position: 'top-center' });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ margin: '6%' }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Add Food 🍕
      </Typography>
      <ToastContainer
        toastStyle={{
          background: '#1e1e1e',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Food Name"
            fullWidth
            value={post.title}
            onChange={inputHandler}
            name="title"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Description"
            multiline
            fullWidth
            rows={8}
            value={post.post}
            onChange={inputHandler}
            name="post"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Image URL"
            fullWidth
            value={post.image}
            onChange={inputHandler}
            name="image"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Price"
            fullWidth
            value={post.price}
            onChange={inputHandler}
            name="price"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Stock"
            fullWidth
            value={post.stock}
            onChange={inputHandler}
            name="stock"
          />
        </Grid>
        <Grid item xs={12}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button variant="contained" color="secondary" fullWidth onClick={addPost}>
              Submit
            </Button>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default AddBlog;
