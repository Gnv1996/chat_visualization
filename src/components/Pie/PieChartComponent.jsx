// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box } from "@mui/material";
// import { PieChart, Pie, Tooltip, Cell } from "recharts";
// import axiosInstance  from '../../utils/axios'

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

// const PieChartComponent = ({ data01, data02 }) => {
//   return (
//     <Box display="flex" justifyContent="space-around" alignItems="center">
//       <PieChart width={400} height={250}>
//         <Pie
//           data={data01}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={50}
//           fill="#8884d8"
//         />
//         <Tooltip />
//       </PieChart>
//       <PieChart width={400} height={250}>
//         <Pie
//           data={data02}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           innerRadius={5}
//           outerRadius={80}
//           fill="#82ca9d"
//           label
//         >
//           {data02.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </PieChart>
//     </Box>
//   );
// };

// const PieChartContainer = () => {
//   const [data01, setData01] = useState([]);
//   const [data02, setData02] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('/generate-query/', {
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });
//         const { data01, data02 } = response.data;
//         setData01(data01);
//         setData02(data02);
//         setLoading(false);
//         console.log(response, "------>------data aaya");
//       } catch (error) {
//         console.error('Error fetching data', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return <PieChartComponent data01={data01} data02={data02} />;
// };

// export default PieChartContainer;





import React from 'react';
import { Box } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const PieChartComponent = ({ data}) => {

  // console.log(data.Order,"fddaaeaf");
  return (
    <Box display="flex" justifyContent="space-around" alignItems="center">
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
    </Box>
  );
};

export default PieChartComponent;
