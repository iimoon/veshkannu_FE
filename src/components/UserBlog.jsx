import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Import CSS for Toastify

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.2 } },
};

const UserBlog = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cartFromState = location.state?.cart || [];
    setCart(cartFromState);

    axios
      .get("http://localhost:3008/api/viewall")
      .then((res) => {
        const updatedData = res.data.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setData(updatedData);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load data. Please try again.");
      });
  }, [location.state?.cart]);

  const handleQuantityChange = (id, type) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item._id === id) {
          if (type === "increment") item.quantity += 1;
          else if (type === "decrement" && item.quantity > 1)
            item.quantity -= 1;
        }
        return item;
      })
    );
  };

  const addToCart = (item) => {
    const userId = localStorage.getItem("userId");
    toast.info("Adding item to cart")
    axios
      .post("http://localhost:3008/api/cart/add-to-cart", {
        userId,
        postId: item._id,
        quantity: item.quantity,
      })
      .then((res) => {
        const updatedCart = [...cart, { ...item }];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        
        toast.success("Item successfully added to cart!");
        navigate("/cart");
      })
      .catch((err) => {
        console.error("Failed to add to cart:", err);
        toast.error("Failed to add item to cart. Please try again.");
      });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 style={{ fontFamily: "fantasy", textAlign: "center" }}>
          Your <span style={{ color: "#EF4F5F" }}>meals</span> just a click away<span style={{ color: "#EF4F5F" }}>!</span>
        </h1>
        <p style={{ fontWeight: "bold", color: "grey", textAlign: "center" }}>
          "Cravings calling? We’ve got you. One click, and your favorite meals
          are on their way. Fresh, fast, and oh-so-tasty. Order now!🥸"
        </p>
      </motion.div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        {data.map((val, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Card
              sx={{
                width: "300px",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={val.image || "https://via.placeholder.com/300x180"}
                alt={val.title}
                sx={{
                  borderRadius: "16px 16px 0 0",
                  transition: "filter 0.3s ease",
                  "&:hover": {
                    filter: "brightness(1.1)",
                  },
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  {val.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {val.post.slice(0, 100)}...
                </Typography>
                <Typography
                  variant="h6"
                  color="green"
                  sx={{ fontWeight: "bold" }}
                >
                  ₹{val.price}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 16px",
                }}
              >
                <div>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(val._id, "decrement")}
                    disabled={val.quantity <= 1}
                  >
                    <Remove />
                  </IconButton>
                  <Typography component="span" sx={{ mx: 1 }}>
                    {val.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(val._id, "increment")}
                  >
                    <Add />
                  </IconButton>
                </div>
                <motion.div variants={buttonVariants} whileHover="hover">
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => addToCart(val)}
                    sx={{
                      backgroundColor: "#ff5a5f",
                      "&:hover": { backgroundColor: "#e04848" },
                    }}
                  >
                    Add to Cart
                  </Button>
                </motion.div>
              </Box>
            </Card>
          </motion.div>
        ))}
      </Box>
    </>
  );
};

export default UserBlog;
