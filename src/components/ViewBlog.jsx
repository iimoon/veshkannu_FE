import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { motion } from "framer-motion"; // Import Framer Motion

const ViewBlog = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3008/api/viewall")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteValue = (id) => {
    axios
      .delete(`http://localhost:3008/api/remove/${id}`)
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setData(data.filter((item) => item._id !== id));
      })
      .catch((err) => {
        toast.error("Failed to delete the item!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      });
  };

  const updateBlog = (val) => {
    navigate("/add", { state: { val, update: true } });
  };

  return (
    <>
      <div>
        <h1 style={{ fontFamily: "Poppins, sans-serif", textAlign: "center" }}>
          Adjust <span style={{ color: "#EF4F5F" }}>Meals</span> Here
        </h1>
        <p>Changes made here will be reflected on the user side</p>
      </div>
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
            initial={{ opacity: 0, y: 20 }}  // Animation start state
            animate={{ opacity: 1, y: 0 }}   // Animation end state
            transition={{ duration: 0.5, delay: i * 0.1 }}  // Add delay for staggered effect
          >
            <Card
              sx={{
                width: "300px",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={val.image}
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
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {val.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    marginBottom: "8px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {val.post.slice(0, 100)}...
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                    color: "#EF4F5F",
                  }}
                >
                  ₹{val.price}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "16px",
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#EF4F5F",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                    color: "#ffffff",
                    borderRadius: "20px",
                    textTransform: "none",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#d43c4a",
                    },
                  }}
                  onClick={() => deleteValue(val._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#00C853",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                    color: "#ffffff",
                    borderRadius: "20px",
                    textTransform: "none",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#00B342",
                    },
                  }}
                  onClick={() => updateBlog(val)}
                >
                  Edit
                </Button>
              </Box>
            </Card>
          </motion.div>
        ))}
      </Box>
    </>
  );
};

export default ViewBlog;
