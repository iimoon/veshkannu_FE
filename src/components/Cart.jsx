import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const totalValue = cart.reduce((total, item) => {
    const quantity = parseInt(item.quantity, 10);
    return total + (item.price || 0) * (isNaN(quantity) ? 1 : quantity);
  }, 0);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart!");
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.");
    } else {
      toast.success("Proceeding to checkout...");
      setTimeout(() => navigate("/order", { state: { cart } }), 1000); // Delay for a better user experience
    }
  };

  const goToMenu = () => {
    navigate("/userview", { state: { cart } });
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "white",
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        margin: "auto",
        marginTop: 4,
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 3,
          color: "#333",
        }}
      >
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            marginBottom: 3,
          }}
        >
          Your cart is empty! Add some delicious items to satisfy your cravings.
        </Typography>
      ) : (
        <Box>
          <List>
            {cart.map((item, index) => (
              <Box key={index}>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                    backgroundColor: "#f7f9fc",
                    borderRadius: 2,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
                    marginBottom: 2,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#2c3e50" }}
                      >
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{ color: "#7f8c8d", marginTop: 1 }}
                      >
                        Quantity: {item.quantity} × ₹{item.price}
                      </Typography>
                    }
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeFromCart(item._id)}
                    sx={{
                      padding: "6px 16px",
                      borderRadius: 2,
                      fontWeight: "bold",
                      boxShadow: 1,
                      "&:hover": {
                        backgroundColor: "error.main",
                        color: "white",
                      },
                    }}
                  >
                    Remove
                  </Button>
                </ListItem>
                {index < cart.length - 1 && <Divider />}
              </Box>
            ))}
          </List>

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "right",
              marginTop: 3,
              color: "#2ecc71",
            }}
          >
            Total: ₹{totalValue.toFixed(2)}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={goToMenu}
          sx={{
            padding: "12px 24px",
            fontWeight: "bold",
            borderRadius: 3,
            boxShadow: 1,
          }}
        >
          Add More Items
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={proceedToCheckout}
          sx={{
            padding: "12px 24px",
            fontWeight: "bold",
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
