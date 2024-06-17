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
  let xAxis, yAxis, tooltipContent, barData, title;

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
      title = "Order Data";
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
      title = "Customer Data";
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
      title = "Employee Data";
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
      title = "Employee Territories Data";
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
      title = "Product Data";
      break;
    case "sqlite_sequence":
      xAxis = <XAxis dataKey="name" type="category" />;
      yAxis = <YAxis dataKey="seq" type="number" />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = ["name", "seq"];

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
      barData = <Bar dataKey="seq" fill="#8884d8" />;
      title = "SQLite Sequence Data";
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
      title = "Region Data";
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
      title = "Shipper Data";
      break;
    case "Categories":
      xAxis = <XAxis dataKey="CategoryName" type="category" />;
      yAxis = <YAxis dataKey="CategoryID" type="number" />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = ["CategoryID", "CategoryName", "Description"];

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
      barData = <Bar dataKey="CategoryID" fill="#8884d8" />;
      title = "Category Data";
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
      title = "Territory Data";
      break;

      case "Orders":
      xAxis = <XAxis dataKey="OrderID" type="number" />;
      yAxis = <YAxis dataKey="EmployeeID" type="number" />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = [
                "OrderID",
                "CustomerID",
                "ShipAddress","ShipCountry","ShipName","ShipPostalCode","ShipRegion","ShippedDate","OrderDate"
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
      barData = <Bar dataKey="OrderID" fill="#8884d8" />;
      title = "Orders";
      break;
      
      case "Suppliers":
      xAxis = <XAxis dataKey="PostalCode" type="category" />;
      yAxis = <YAxis dataKey="SupplierID" type="number" />;
      tooltipContent = (
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const item = payload[0].payload;
              const keysToShow = [
                "Region",
                "PostalCode",
                "SupplierID","Phone","Country"
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
      barData = <Bar dataKey="SupplierID" fill="#8884d8" />;
      title = "Supplier";
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
      title = "KPI Definitions Data";
      break;
    default:
      // Handle default case
      title = "Data";
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
            <Typography variant="h6" style={{ marginBottom: "10px" }}>
              {title}
            </Typography>
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
                data.KPIDefinitions ||
                data.sqlite_sequence ||
                data.Categories ||
                data.Orders ||
                data.Suppliers
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
            value={chartType || ''}
            displayEmpty
            size="small"
            onChange={(e) => handleInsideSelect(e,id)}
          >
            <MenuItem value="" disabled>
              Select
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
