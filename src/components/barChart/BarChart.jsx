// import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Rectangle,
// } from "recharts";
// import { MdDelete } from "react-icons/md";
// import { MdDownload } from "react-icons/md";

// const BarChartCom = ({
//   data,
//   handleDelete,
//   id,
//   handleInputChange,
//   optionData,
//   promptText,
// }) => {
//   console.log(data, "dataaaaaaaaaaaaaaaaaaaaa");
//   // let ChartData = [];
//   // if (data) {
//   //   const aggregatedOrderData = data?.reduce((acc, current) => {
//   //     const { OrderID, Quantity } = current;
//   //     if (!acc[OrderID]) {
//   //       acc[OrderID] = 0;
//   //     }
//   //     acc[OrderID] += Quantity;
//   //     return acc;
//   //   }, {});

//   //   ChartData = Object.keys(aggregatedOrderData).map((OrderID) => ({
//   //     OrderID,
//   //     Quantity: aggregatedOrderData[OrderID],
//   //   }));
//   // }

//   const convertToCSV = (data) => {
//     const csvRows = [];
//     const headers = Object.keys(data[0]);
//     csvRows.push(headers.join(","));

//     for (const row of data) {
//       const values = headers.map((header) => row[header]);
//       csvRows.push(values.join(","));
//     }

//     return csvRows.join("\n");
//   };

//   const downloadCSV = (data) => {
//     const csvData = convertToCSV(data);
//     const blob = new Blob([csvData], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.setAttribute("hidden", "");
//     a.setAttribute("href", url);
//     a.setAttribute("download", "chart_data.csv");
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   return (
//     <Box display={"flex"} width={"480px"} gap={2} style={{ cursor: "pointer" }}>
//       <ResponsiveContainer width="100%" height={340}>
//         <div style={{ display: "flex" }}>
//           <div style={{ flex: 1, textAlign: "center" }}>
//             <BarChart
//               width={400}
//               height={300}
//               data={data && data}
//               margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               {/* for order */}
//               data.Order && (<XAxis dataKey="OrderID" />
//               <Bar dataKey="Quantity" fill="#8884d8" />
//               <Tooltip />
//               <YAxis />)

//               {/* for customer */}
//               data.Customers &&( <YAxis />
//               <Tooltip
//                 content={({ payload }) => {
//                   if (payload && payload.length) {
//                     const item = payload[0].payload;
//                     return (
//                       <div style={{ backgroundColor: "#fff", padding: "5px" }}>
//                         <p>
//                           <strong>Company Name:</strong> {item.CompanyName}
//                         </p>
//                         <p>
//                           <strong>Contact Name:</strong> {item.ContactName}
//                         </p>
//                         <p>
//                           <strong>Contact Title:</strong> {item.ContactTitle}
//                         </p>
//                         <p>
//                           <strong>Address:</strong> {item.Address}
//                         </p>
//                         <p>
//                           <strong>City:</strong> {item.City}
//                         </p>
//                         <p>
//                           <strong>Region:</strong> {item.Region}
//                         </p>
//                         <p>
//                           <strong>Country:</strong> {item.Country}
//                         </p>
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               <XAxis dataKey="CustomerID" />
//               <Bar dataKey="CompanyName" fill="#8884d8" />)

//               {/* for employees */}
//               {/* <Tooltip
//                 content={({ payload }) => {
//                   if (payload && payload.length) {
//                     const item = payload[0].payload;
//                     const keysToShow = [
//                       "EmployeeID",
//                       "Title",
//                       "TitleOfCourtesy",
//                       "Extension",
//                       "City",
//                       "Region",
//                       "Country",
//                     ];

//                     const tooltipContent = keysToShow.map((key) => (
//                       <p key={key}>
//                         <strong>
//                           {key === "TitleOfCourtesy" ? "Name" : key}:
//                         </strong>{" "}
//                         {key === "TitleOfCourtesy"
//                           ? `${item[key]} ${item["FirstName"]}`
//                           : item[key]}
//                       </p>
//                     ));
//                     return (
//                       <div style={{ backgroundColor: "#f7f2f2", padding: "5px" }}>
//                         {tooltipContent}
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               <YAxis />
//               <XAxis dataKey="EmployeeID" />
//               <Bar dataKey="Extension" fill="#8884d8" /> */}

//               {/* for EmployeeTerritories */}
//               {/* <Tooltip
//                 content={({ payload }) => {
//                   if (payload && payload.length) {
//                     const item = payload[0].payload;
//                     const keysToShow = ["EmployeeID", "TerritoryID"];

//                     const tooltipContent = keysToShow.map((key) => (
//                       <p key={key}>
//                         <strong>{key}:</strong> {item[key]}
//                       </p>
//                     ));
//                     return (
//                       <div
//                         style={{ backgroundColor: "#f7f2f2", padding: "5px" }}
//                       >
//                         {tooltipContent}
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               <YAxis />
//               <XAxis dataKey="EmployeeID" />
//               <Bar dataKey="TerritoryID" fill="#8884d8" /> */}

//               {/* for products */}
//               {/* <Tooltip
//                 content={({ payload }) => {
//                   if (payload && payload.length) {
//                     const item = payload[0].payload;
//                     const keysToShow = [
//                       "ProductID",
//                       "ProductName",
//                       "QuantityPerUnit",
//                       "UnitPrice",
//                       "UnitsInStock",
//                       "UnitsOnOrder",
//                       "Discontinued",
//                       "ReorderLevel",
//                     ];

//                     const tooltipContent = keysToShow.map((key) => (
//                       <p key={key}>
//                         <strong>{key}:</strong> {item[key]}
//                       </p>
//                     ));
//                     return (
//                       <div
//                         style={{ backgroundColor: "#f7f2f2", padding: "5px" }}
//                       >
//                         {tooltipContent}
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               <YAxis />
//               <XAxis dataKey="ProductID" />
//               <Bar dataKey="UnitPrice" fill="#8884d8" /> */}

//               {/* for Regions  */}
//               {/* <Tooltip
//                 content={({ payload }) => {
//                   if (payload && payload.length) {
//                     const item = payload[0].payload;
//                     const keysToShow = ["RegionID", "RegionDescription"];

//                     const tooltipContent = keysToShow.map((key) => (
//                       <p key={key}>
//                         <strong>{key}:</strong> {item[key]}
//                       </p>
//                     ));
//                     return (
//                       <div
//                         style={{ backgroundColor: "#f7f2f2", padding: "5px" }}
//                       >
//                         {tooltipContent}
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               <XAxis dataKey="RegionDescription" type="category" />
//               <YAxis dataKey="RegionID" type="number" />
//               <Tooltip />
//               <Bar dataKey="RegionID" fill="#8884d8" /> */}

//               {/* for shippers */}
//               data.Shippers && (<Tooltip
//                 content={({ payload }) => {
//                   if (payload && payload.length) {
//                     const item = payload[0].payload;
//                     const keysToShow = ["ShipperID", "CompanyName", "Phone"];

//                     const tooltipContent = keysToShow.map((key) => (
//                       <p key={key}>
//                         <strong>{key}:</strong> {item[key]}
//                       </p>
//                     ));
//                     return (
//                       <div
//                         style={{ backgroundColor: "#f7f2f2", padding: "5px" }}
//                       >
//                         {tooltipContent}
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               <XAxis dataKey="CompanyName" type="category" />
//               <YAxis dataKey="ShipperID" type="number" />
//               <Tooltip />
//               <Bar dataKey="ShipperID" fill="#8884d8" />)

//               {/* for Territories */}
//               data.Territories &&( <Tooltip
//                 content={({ payload }) => {
//                   if (payload && payload.length) {
//                     const item = payload[0].payload;
//                     const keysToShow = [
//                       "RegionID",
//                       "TerritoryID",
//                       "TerritoryDescription",
//                     ];

//                     const tooltipContent = keysToShow.map((key) => (
//                       <p key={key}>
//                         <strong>{key}:</strong> {item[key]}
//                       </p>
//                     ));
//                     return (
//                       <div
//                         style={{ backgroundColor: "#f7f2f2", padding: "5px" }}
//                       >
//                         {tooltipContent}
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               <XAxis dataKey="CompanyName" type="category" />
//               <YAxis dataKey="RegionID" type="number" />
//               <Tooltip />
//               <Bar dataKey="RegionID" fill="#8884d8" />)

//               {/* for KPIDefinitions  */}
//               data.KPIDefinitions &&
//               (<Tooltip
//                 content={({ payload }) => {
//                   if (payload && payload.length) {
//                     const item = payload[0].payload;
//                     const keysToShow = [
//                       "KPIID",
//                       "KPIName",
//                       "RelevantDimensions",
//                       "Description",
//                     ];

//                     const tooltipContent = keysToShow.map((key) => (
//                       <p key={key}>
//                         <strong>{key}:</strong> {item[key]}
//                       </p>
//                     ));
//                     return (
//                       <div
//                         style={{ backgroundColor: "#f7f2f2", padding: "5px" }}
//                       >
//                         {tooltipContent}
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               <XAxis dataKey="RelevantDimensions" type="category" />
//               <YAxis dataKey="KPIID" type="number" />
//               <Tooltip />
//               <Bar dataKey="KPIID" fill="#8884d8" />)
//             </BarChart>
//             <Box display={"flex"} justifyContent={"center"} width={400}>
//               <Typography
//                 variant="h2"
//                 fontSize={"16px"}
//                 fontWeight={"600"}
//                 backgroundColor={"#605af2"}
//                 maxWidth={"max-content"}
//                 borderRadius={"4px"}
//                 px={1}
//                 py={0}
//                 color={"#fff"}
//               >
//                 {data.length}
//                 <span style={{ marginLeft: "6px" }}>orders</span>
//               </Typography>
//             </Box>
//           </div>
//         </div>
//       </ResponsiveContainer>
//       <Box>
//         <Box>
//           <Select
//             sx={{ width: "100px" }}
//             value={promptText.selectedValue}
//             name={"selectedValue"}
//             displayEmpty
//             size="small"
//             onChange={(e) => handleInputChange(e, "selectedValue")}
//           >
//             <MenuItem value="" disabled>
//               --- Choose Type ---
//             </MenuItem>
//             {optionData.map((option) => (
//               <MenuItem
//                 key={option.value}
//                 value={option.value}
//                 sx={{ width: "200px", fontSize: "14px" }}
//               >
//                 {option.value}
//               </MenuItem>
//             ))}
//           </Select>
//         </Box>
//         <Box
//           display={"flex"}
//           gap={1}
//           alignItems={"center"}
//           bgcolor={"#e8e7e3"}
//           p={1}
//           borderRadius={2}
//           height={"max-content"}
//           zIndex={1}
//           mt={1}
//           justifyContent={"center"}
//         >
//           <MdDelete
//             size={24}
//             cursor={"pointer"}
//             color="#f76f86"
//             onClick={() => handleDelete(id)}
//           />
//           <MdDownload
//             size={26}
//             cursor={"pointer"}
//             color="#8884D8"
//             onClick={() => downloadCSV(ChartData)}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default BarChartCom;

import { Box, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MdDelete, MdDownload } from "react-icons/md";

const BarChartCom = ({
  data,
  handleDelete,
  id,
  handleInsideSelect,
  optionData,
  chartType,
}) => {
  const dataType = Object.keys(data)[0];
  let xAxis, yAxis, tooltipContent, barData;

  console.log(data, "##################3");

  switch (dataType) {
    case "Order":
      xAxis = <XAxis dataKey="ProductID" />;
      yAxis = <YAxis dataKey="UnitPrice" type="number" />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = [
                "ProductID",
                "OrderID",
                "Quantity",
                "UnitPrice",
                "Discount",
              ];
              return (
                <div style={{ backgroundColor: "#f7f2f2", padding: "5px" }}>
                  {keysToShow.map((key) => (
                    <p key={key}>
                      <strong>{key}:</strong> {item[key]}
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
      );
      barData = <Bar dataKey="UnitPrice" fill="#8884d8" />;
      break;
    case "Customers":
      xAxis = <XAxis dataKey="CustomerID" />;
      yAxis = <YAxis dataKey="PostalCode" type="number" />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = [
                "CompanyName",
                "ContactName",
                "ContactTitle",
                "Address",
                "City",
                "Region",
                "Country",
              ];
              return (
                <div style={{ backgroundColor: "#f7f2f2", padding: "5px" }}>
                  {keysToShow.map((key) => (
                    <p key={key}>
                      <strong>{key}:</strong> {item[key]}
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
      );
      barData = <Bar dataKey="PostalCode" fill="#8884d8" />;
      break;
    case "Employees":
      xAxis = <XAxis dataKey="EmployeeID" />;
      yAxis = <YAxis />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = [
                "EmployeeID",
                "Title",
                "TitleOfCourtesy",
                "Extension",
                "City",
                "Region",
                "Country",
              ];
              return (
                <div style={{ backgroundColor: "#f7f2f2", padding: "5px" }}>
                  {keysToShow.map((key) => (
                    <p key={key}>
                      <strong>
                        {key === "TitleOfCourtesy" ? "Name" : key}:
                      </strong>{" "}
                      {key === "TitleOfCourtesy"
                        ? `${item[key]} ${item["FirstName"]}`
                        : item[key]}
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
      );
      barData = <Bar dataKey="Extension" fill="#8884d8" />;
      break;
    case "EmployeeTerritories":
      xAxis = <XAxis dataKey="EmployeeID" />;
      yAxis = <YAxis />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = ["EmployeeID", "TerritoryID"];
              return (
                <div style={{ backgroundColor: "#f7f2f2", padding: "5px" }}>
                  {keysToShow.map((key) => (
                    <p key={key}>
                      <strong>{key}:</strong> {item[key]}
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
      );
      barData = <Bar dataKey="TerritoryID" fill="#8884d8" />;
      break;
    case "Products":
      xAxis = <XAxis dataKey="ProductID" />;
      yAxis = <YAxis />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = [
                "ProductID",
                "ProductName",
                "QuantityPerUnit",
                "UnitPrice",
                "UnitsInStock",
                "UnitsOnOrder",
                "Discontinued",
                "ReorderLevel",
              ];

              const tooltipContent = keysToShow.map((key) => (
                <p key={key}>
                  <strong>{key}:</strong> {item[key]}
                </p>
              ));
              return (
                <div style={{ backgroundColor: "#f7f2f2", padding: "5px" }}>
                  {tooltipContent}
                </div>
              );
            }
            return null;
          }}
        />
      );
      barData = <Bar dataKey="UnitPrice" fill="#8884d8" />;
      break;
    case "Regions":
      xAxis = <XAxis dataKey="RegionDescription" type="category" />;
      yAxis = <YAxis dataKey="RegionID" type="number" />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = ["RegionID", "RegionDescription"];

              const tooltipContent = keysToShow.map((key) => (
                <p key={key}>
                  <strong>{key}:</strong> {item[key]}
                </p>
              ));
              return (
                <div style={{ backgroundColor: "#f7f2f2", padding: "5px" }}>
                  {tooltipContent}
                </div>
              );
            }
            return null;
          }}
        />
      );
      barData = <Bar dataKey="RegionID" fill="#8884d8" />;
      break;
    case "Shippers":
      xAxis = <XAxis dataKey="CompanyName" type="category" />;
      yAxis = <YAxis dataKey="ShipperID" type="number" />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = ["ShipperID", "CompanyName", "Phone"];

              const tooltipContent = keysToShow.map((key) => (
                <p key={key}>
                  <strong>{key}:</strong> {item[key]}
                </p>
              ));
              return (
                <div style={{ backgroundColor: "#f7f2f2", padding: "5px" }}>
                  {tooltipContent}
                </div>
              );
            }
            return null;
          }}
        />
      );
      barData = <Bar dataKey="ShipperID" fill="#8884d8" />;
      break;
    case "Territories":
      xAxis = <XAxis dataKey="CompanyName" type="category" />;
      yAxis = <YAxis dataKey="RegionID" type="number" />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = [
                "RegionID",
                "TerritoryID",
                "TerritoryDescription",
              ];

              const tooltipContent = keysToShow.map((key) => (
                <p key={key}>
                  <strong>{key}:</strong> {item[key]}
                </p>
              ));
              return (
                <div style={{ backgroundColor: "#f7f2f2", padding: "5px" }}>
                  {tooltipContent}
                </div>
              );
            }
            return null;
          }}
        />
      );
      barData = <Bar dataKey="RegionID" fill="#8884d8" />;
      break;
    case "KPIDefinitions":
      xAxis = <XAxis dataKey="RelevantDimensions" type="category" />;
      yAxis = <YAxis dataKey="KPIID" type="number" />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = [
                "KPIID",
                "KPIName",
                "RelevantDimensions",
                "Description",
              ];

              const tooltipContent = keysToShow.map((key) => (
                <p key={key}>
                  <strong>{key}:</strong> {item[key]}
                </p>
              ));
              return (
                <div style={{ backgroundColor: "#f7f2f2", padding: "5px" }}>
                  {tooltipContent}
                </div>
              );
            }
            return null;
          }}
        />
      );
      barData = <Bar dataKey="KPIID" fill="#8884d8" />;
      break;
    default:
      // Handle default case
      break;
  }

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

  return (
    <Box display={"flex"} width={"480px"} gap={2} style={{ cursor: "pointer" }}>
      <ResponsiveContainer width="100%" height={340}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <BarChart
              width={400}
              height={300}
              data={
                data.Order ||
                data.Customers ||
                data.Employees ||
                data.EmployeeTerritories ||
                data.Products ||
                data.Regions ||
                data.Shippers ||
                data.Territories ||
                data.KPIDefinitions
              }
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {xAxis}
              {yAxis}
              {tooltipContent}
              {barData}
            </BarChart>
            <Box display={"flex"} justifyContent={"center"} width={400}>
              <Typography
                variant="h2"
                fontSize={"16px"}
                fontWeight={"600"}
                backgroundColor={"#605af2"}
                maxWidth={"max-content"}
                borderRadius={"4px"}
                px={1}
                py={0}
                color={"#fff"}
              >
                {data.length}
                <span style={{ marginLeft: "6px" }}>orders</span>
              </Typography>
            </Box>
          </div>
        </div>
      </ResponsiveContainer>
      <Box>
        <Box>
          <Select
            sx={{ width: "100px" }}
            value={chartType}
            displayEmpty
            size="small"
            onChange={(e) => handleInsideSelect(e,id)}
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
          gap={1}
          alignItems={"center"}
          bgcolor={"#e8e7e3"}
          p={1}
          borderRadius={2}
          height={"max-content"}
          zIndex={1}
          mt={1}
          justifyContent={"center"}
        >
          <MdDelete
            size={24}
            cursor={"pointer"}
            color="#f76f86"
            onClick={() => handleDelete(id)}
          />
          <MdDownload
            size={26}
            cursor={"pointer"}
            color="#8884D8"
            onClick={() => downloadCSV(data)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BarChartCom;
