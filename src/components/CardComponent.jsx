// CardComponent.js
import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Input, InputAdornment } from '@mui/material';

const CardComponent = ({ title, post, price, image, stock, onIncrement, onDecrement, quantity, onOrder }) => {
     // Create an object to store quantities for each post based on its id
  const [quantities, setQuantities] = useState(0);

  const handleQuantityChange = (id, type) => {
    setQuantities(prevQuantities => {
      const updatedQuantities = { ...prevQuantities };
      if (!updatedQuantities[id]) updatedQuantities[id] = 1; // Initialize if not already set

      if (type === 'increment') {
        updatedQuantities[id] += 1; // Increment the quantity for the given post
      } else if (type === 'decrement' && updatedQuantities[id] > 1) {
        updatedQuantities[id] -= 1; // Decrement the quantity, ensuring it doesn't go below 1
      }

      return updatedQuantities;
    });
  };
    return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} title="Blog image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={onOrder}>
          Order
        </Button>

        {/* Quantity selector with up/down arrows */}
        <Input
          value={quantities} // Bind the input value to the specific quantity
          type="number"
          readOnly
          startAdornment={
            <InputAdornment position="start">
              <Button
                onClick={handleQuantityChange('increment')}
                disabled={quantity <= 1}
                size="small"
              >
                -
              </Button>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <Button onClick={handleQuantityChange} size="small">
                +
              </Button>
            </InputAdornment>
          }
        />
        <Button variant="contained" color="success" size="small">
          {stock}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
