import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { format } from "date-fns";
import { motion } from "framer-motion";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3008/api/admin/orders"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await axios.patch(`http://localhost:3008/api/admin/orders/${orderId}`, {
        status,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : format(date, "dd MMM yyyy, hh:mm a");
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        padding: 4,
        backgroundColor: "background.paper",
        borderRadius: 3,
        boxShadow: 3,
        maxWidth: "1200px",
        margin: "auto",
        marginTop: 6,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Manage Orders
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "#EF4F5F" }}>
              <TableRow>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", padding: "12px" }}
                >
                  <strong>Order ID</strong>
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", padding: "12px" }}
                >
                  <strong>User</strong>
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", padding: "12px" }}
                >
                  <strong>Email</strong>
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", padding: "12px" }}
                >
                  <strong>Class</strong>
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", padding: "12px" }}
                >
                  <strong>College</strong>
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", padding: "12px" }}
                >
                  <strong>Total (₹)</strong>
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", padding: "12px" }}
                >
                  <strong>Status</strong>
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", padding: "12px" }}
                >
                  <strong>Created At</strong>
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", padding: "12px" }}
                >
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.userId?.name || "N/A"}</TableCell>
                  <TableCell>{order.userId?.email || "N/A"}</TableCell>
                  <TableCell>{order.userId?.class || "N/A"}</TableCell>
                  <TableCell>{order.userId?.college || "N/A"}</TableCell>
                  <TableCell>{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={
                        order.status === "approved"
                          ? "success"
                          : order.status === "cancelled"
                          ? "error"
                          : "warning"
                      }
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          backgroundColor: "#EF4F5F",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#D43A4E",
                          },
                          transition: "all 0.3s ease",
                        }}
                        onClick={() =>
                          handleStatusUpdate(order._id, "approved")
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          color: "#EF4F5F",
                          borderColor: "#EF4F5F",
                          fontWeight: "bold",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "rgba(239, 79, 95, 0.1)",
                          },
                          transition: "all 0.3s ease",
                        }}
                        onClick={() =>
                          handleStatusUpdate(order._id, "cancelled")
                        }
                      >
                        Cancel
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminOrders;
