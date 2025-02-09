import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItemText,
  CircularProgress,
  Divider,
  Chip,
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

const statusColors = {
  pending: '#FFA000',   // Amber
  approved: '#1976D2',  // Blue
  completed: '#4CAF50', // Green
  cancelled: '#D32F2F',  // Red
};

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3008/api/orders/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ padding: 4, maxWidth: '800px', margin: 'auto', marginTop: 6 }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          You have no orders yet.
        </Typography>
      ) : (
        <List>
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box
                sx={{
                  marginBottom: 3,
                  padding: 3,
                  backgroundColor: '#f4f6f8',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                      Order #{order._id}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography sx={{ color: 'text.secondary' }}>
                        Date: {new Date(order.createdAt).toLocaleString()}
                      </Typography>
                      <Typography sx={{ marginTop: 1, fontWeight: 'bold' }}>Items:</Typography>
                      {order.items.map((item, i) => (
                        <Typography key={i} sx={{ marginLeft: 2 }}>
                          - {item.postId?.title || 'Unknown Item'} × {item.quantity}
                        </Typography>
                      ))}
                      <Typography sx={{ marginTop: 1, fontWeight: 'bold' }}>
                        Total Amount:<span style={{color:"green"}}>₹{order.totalAmount}</span> 
                      </Typography>
                      <Chip
                        label={order.status.toUpperCase()}
                        sx={{
                          marginTop: 2,
                          backgroundColor: statusColors[order.status],
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      />
                    </Box>
                  }
                />
              </Box>
              {index < orders.length - 1 && <Divider sx={{ marginY: 2 }} />}
            </motion.div>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MyOrder;
