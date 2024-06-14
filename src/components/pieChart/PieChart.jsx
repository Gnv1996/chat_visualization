// import { PieChart, Pie, Cell } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// export default function PieChartCom ({data}) {
//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         data={data}
//         cx={200}
//         cy={200}
//         labelLine={false}
//         label={renderCustomizedLabel}
//         outerRadius={80}
//         fill="#8884d8"
//         dataKey="value"
//       >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//     </PieChart>
//   );
// }

import { Box, MenuItem, Select, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { MdDelete } from "react-icons/md";
import { MdDownload } from "react-icons/md";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const calculateTotalDiscount = (data) => {
  let totalDiscount = 0;

  // Iterate over each order in the data
  data.Order.forEach((order) => {
    // Calculate total discount for each order item and accumulate it
    totalDiscount += order.Discount * order.Quantity;
  });

  return totalDiscount;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartCom({
  data,
  handleInputChange,
  optionData,
  promptText,
  id,
  handleDelete,
}) {
  console.log(data, "dataaaaaaaaaaaaa");
  const totalDiscount = calculateTotalDiscount(data);
  const convertToCSV = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => row[header]);
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };

  const downloadCSV = (data) => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "chart_data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const pieChartData = [
    { name: "Discounted", value: totalDiscount },
    { name: "Undiscounted", value: 100 - totalDiscount },
  ];

  return (
    <Box>
      <Box display={"flex"}>
        <PieChart width={300} height={300}>
          <Pie
            data={pieChartData}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Box>
      <Box display={"flex"} justifyContent={"center"} width={400} gap={2}>
        <Box>
          <Typography
            variant="h2"
            fontSize={"16px"}
            fontWeight={"600"}
            backgroundColor={"#605af2"}
            maxWidth={"max-content"}
            borderRadius={"4px"}
            px={1}
            py={1}
            color={"#fff"}
          >
            {data.Order.length}
            <span style={{ marginLeft: "6px" }}>orders</span>
          </Typography>
        </Box>
        <Box>
          <Select
            sx={{ width: "100px" }}
            value={promptText.selectedValue}
            name={"selectedValue"}
            displayEmpty
            size="small"
            onChange={(e) => handleInputChange(e, "selectedValue")}
          >
            <MenuItem value="" disabled>
              --- Choose Type ---
            </MenuItem>
            {optionData.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ width: "200px", fontSize: "14px" }}
              >
                {option.value}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          display={"flex"}
          //   flexDirection={"column"}
          gap={1}
          alignItems={"center"}
          bgcolor={"#e8e7e3"}
          p={1}
          borderRadius={2}
          height={"max-content"}
        >
          <MdDelete
            size={22}
            cursor={"pointer"}
            color="#f76f86"
            onClick={() => handleDelete(id)}
          />
          <MdDownload
            size={22}
            cursor={"pointer"}
            color="#8884D8"
            onClick={() => downloadCSV(pieChartData)}
          />
        </Box>
      </Box>
    </Box>
  );
}
