import React from 'react';
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const PieChartComponent = ({ data }) => {
  const hasData = data && data.Order && data.Order.length > 0;

  return (
    <Box display="flex" justifyContent="space-around" alignItems="center">
      {hasData ? (
        <>
          <PieChart width={400} height={250}>
            <Pie
              data={data.Order}
              dataKey="Quantity"
              nameKey="UnitPrice"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
            <Tooltip />
          </PieChart>
          <PieChart width={400} height={250}>
            <Pie
              data={data.Order}
              dataKey="Quantity"
              nameKey="UnitPrice"
              cx="50%"
              cy="50%"
              innerRadius={5}
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {data.Order.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </>
      ) : (
        <Typography variant="h6" color="red">
          Please try Again
        </Typography>
      )}
    </Box>
  );
};

export default PieChartComponent;
