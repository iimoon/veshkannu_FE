import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import axios from "axios";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    pendingOrders: 0,
    approvedOrders: 0,
    cancelledOrders: 0,
    totalEarned: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:3008/api/admin/summary");
        setSummary(res.data.summary);
        setMonthlyData(res.data.monthlyOrders);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 4 }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {[
          { title: "Pending Orders", value: summary.pendingOrders, bgColor: "#4A90E2" },
          { title: "Approved Orders", value: summary.approvedOrders, bgColor: "#2ECC71" },
          { title: "Cancelled Orders", value: summary.cancelledOrders, bgColor: "#D63031" },
          { title: "Total Earned", value: `₹${summary.totalEarned.toFixed(2)}`, bgColor: "#F4A261" },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
            >
              <Card>
                <CardContent sx={{ background: item.bgColor }}>
                  <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="h4" color="white">
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Monthly Orders Overview
        </Typography>
        <motion.div variants={chartVariants} initial="hidden" animate="visible">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
