import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { motion } from 'framer-motion';

const Order = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart || [];
  const userId = localStorage.getItem('userId');  // Get userId from localStorage
  const totalValue = cart.reduce((total, item) => {
    const quantity = parseInt(item.quantity, 10);
    return isNaN(item.price) || isNaN(quantity) ? total : total + item.price * quantity;
  }, 0);

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => navigate('/userview');

  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to confirm the order.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3008/api/create-order', {
        userId,
        items: cart.map(item => ({
          postId: item._id,  // Assuming item._id is the product ID
          quantity: item.quantity,
        })),
      });

      console.log('Order created:', response.data);
      setOpenDialog(true);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOk = () => {
    setOpenDialog(false);
    navigate('/myorder');
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        padding: 4,
        backgroundColor: 'background.paper',
        borderRadius: 3,
        boxShadow: 4,
        maxWidth: '800px',
        margin: 'auto',
        marginTop: 6,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: '600', marginBottom: 3 }}>
        Your <i>Order</i>
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          Your cart is empty!
        </Typography>
      ) : (
        <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <List>
            {cart.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  marginBottom: 2,
                  backgroundColor: 'white',
                  borderRadius: 2,
                  boxShadow: 1,
                  padding: 2,
                }}
                component={motion.div}
                whileHover={{ scale: 1.02 }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {item.title}
                    </Typography>
                  }
                  secondary={`Quantity: ${item.quantity}, Price: ${item.price} × ${item.quantity}`}
                />
              </ListItem>
            ))}
          </List>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              marginTop: 4,
              marginBottom: 2,
              textAlign: 'right',
            }}
          >
            Total Value: ₹{totalValue.toFixed(2)}
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ padding: '12px 24px', borderRadius: 3, textTransform: 'none' }}
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          onClick={handleConfirmOrder}
          disabled={loading}
        >
          {loading ? 'Placing Order...' : 'Confirm Order'}
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ padding: '10px 20px', borderRadius: 3, textTransform: 'none' }}
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          onClick={handleCancel}
        >
          <i>Cancel</i>
        </Button>
      </Box>

      {/* Custom Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          component: motion.div,
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
        }}
      >
        <DialogTitle>Order Confirmed!</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Your order has been confirmed. Would you like to go to "My Orders" to view your order details?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: 'none', borderRadius: 2 }}
            onClick={handleDialogOk}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Order;
