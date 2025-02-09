import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import drooling from "../components/assets/lottie/drooling.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, yoyo: Infinity },
  },
};

const Login = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    toast.info("Processing login...", { autoClose: 2000 });

    setTimeout(() => {
      axios
        .post("http://localhost:3008/api/login", inputs)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("userId", res.data.userId);
            toast.success("Login successful!, Redirecting...", { autoClose: 3000 });
            setTimeout(() => navigate("/userview"), 3000);
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 404) {
              toast.error("User not found. Please check your username.", {
                autoClose: 3000,
              });
            } else if (err.response.status === 401) {
              toast.error("Incorrect password. Please try again.", {
                autoClose: 3000,
              });
            } else {
              toast.error("An error occurred. Please try again later.", {
                autoClose: 3000,
              });
            }
          } else {
            toast.error("Network error. Please check your connection.", {
              autoClose: 3000,
            });
          }
        });
    }, 2000);
  };

  return (
    <>
      <img src="veshkunnu.webp" style={{ height: "50px", marginTop: "10px" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "700px",
          gap: 10,
        }}
      >
        <div>
          <motion.h1
            style={{ fontFamily: "cursive" }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            Welcome to <span style={{ color: "#EF4F5F" }}>VESHKUNUU</span>
          </motion.h1>

          <div style={{ height: "300px", width: "100%" }}>
            <p style={{ color: "grey", fontWeight: "bold" }}>
              <span style={{ fontWeight: "bolder" }}>Hungry?</span> Login to
              Continue Snacking! 😉
            </p>
            <Lottie
              animationData={drooling}
              loop={true}
              style={{ height: "100%" }}
            />
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box
            sx={{
              padding: 4,
              maxWidth: 400,
              borderRadius: 4,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
              backgroundColor: "#121212",
              color: "#E0E0E0",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ fontWeight: 600, color: "#EF4F5F", mb: 3 }}
            >
              Login to Continue!
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Username"
                    onChange={inputHandler}
                    name="username"
                    InputLabelProps={{ style: { color: "#B0BEC5" } }}
                    InputProps={{
                      style: { backgroundColor: "#1e1e1e", color: "#E0E0E0" },
                    }}
                    required
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Password"
                    onChange={inputHandler}
                    name="password"
                    type="password"
                    InputLabelProps={{ style: { color: "#B0BEC5" } }}
                    InputProps={{
                      style: { backgroundColor: "#1e1e1e", color: "#E0E0E0" },
                    }}
                    required
                  />
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <motion.div whileHover="hover" variants={buttonVariants}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: "#EF4F5F",
                        color: "#fff",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#d43c4a" },
                      }}
                      onClick={submitHandler}
                    >
                      Log In
                    </Button>
                  </motion.div>
                </motion.div>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#B0BEC5" }}>
                  <Link
                    to="/sign"
                    style={{ color: "#EF4F5F", textDecoration: "none" }}
                  >
                    New User? Sign Up
                  </Link>
                </Typography>
                <Button variant="text" sx={{ mt: 1, color: "#EF4F5F" }}>
                  <Link
                    to="/adminlogin"
                    style={{ textDecoration: "none", color: "#EF4F5F" }}
                  >
                    Admin
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Box>

      <div style={{ color: "gray" }}>built with സ്നേഹം❣️</div>

      <ToastContainer position="top-right" />
    </>
  );
};

export default Login;
