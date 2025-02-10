import React, { useState } from "react";
import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Adminlogin = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3008/api/adminlogin",
        inputs
      );
      if (res.data.token) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token); // Corrected usage of jwtDecode

        if (decoded.isAdmin) {
          toast.success("🎉 Welcome back, Admin!", { position: "top-center" });
          setTimeout(() => navigate("/view"), 1500); // Delay navigation for toast to show
        } else {
          toast.error("🚫 Access denied! Admins only.", {
            position: "top-center",
          });
        }
      } else {
        toast.error(res.data.message || "❌ Login failed!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("⚠️ An error occurred. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#FCE4EC", // Light pink background
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          padding: 4,
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            color: "#EF4F5F",
            fontFamily: "Poppins, sans-serif",
            mb: 3,
          }}
        >
          Veshkunnu<span style={{color:"pink"}}>@admin</span>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Username"
              name="username"
              onChange={inputHandler}
              InputLabelProps={{ style: { color: "#EF4F5F" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#EF4F5F" },
                  "&.Mui-focused fieldset": { borderColor: "#EF4F5F" },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              onChange={inputHandler}
              InputLabelProps={{ style: { color: "#EF4F5F" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#EF4F5F" },
                  "&.Mui-focused fieldset": { borderColor: "#EF4F5F" },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#EF4F5F",
                color: "white",
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                "&:hover": {
                  backgroundColor: "#D43A4E",
                },
              }}
              onClick={submitHandler}
            >
              Log In
            </Button>
          </Grid>
        </Grid>
        <div style={{ marginTop: "10px" }}>
          <a href="/">Click here to go back home</a>
        </div>
      </Box>
    </Box>
  );
};

export default Adminlogin;
