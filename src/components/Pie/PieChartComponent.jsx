import React from 'react';
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { MdDelete, MdDownload } from "react-icons/md";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const PieChartComponent = ({
  data,
  handleDelete,
  id,
  handleInsideSelect,
  optionData,
  chartType,
}) => {
  const dataType = Object.keys(data)[0];
  let nameKey, dataKey, tooltipContent, title;

  switch (dataType) {
    case "Order":
      nameKey = "ProductID";
      dataKey = "UnitPrice";
      title = "Order Data";
      tooltipContent = ({ payload }) => {
        if (payload && payload.length) {
          const item = payload[0].payload;
          const keysToShow = ["ProductID", "OrderID", "Quantity", "UnitPrice", "Discount"];
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
      };
      break;
    case "Categories":
      nameKey = "CategoryID";
      dataKey = "CategoryID";
      title = "Category Data";
      tooltipContent = ({ payload }) => {
        if (payload && payload.length) {
          const item = payload[0].payload;
          const keysToShow = ["CategoryID", "CategoryName", "Description", "Picture"];
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
      };
      break;
    case "sqlite_sequence":
      nameKey = "seq";
      dataKey = "seq";
      title = "SQLite Sequence Data";
      tooltipContent = ({ payload }) => {
        if (payload && payload.length) {
          const item = payload[0].payload;
          const keysToShow = ["seq", "name"];
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
      };
      break;
    case "Customers":
      nameKey = "CustomerID";
      dataKey = "PostalCode";
      title = "Customer Data";
      tooltipContent = ({ payload }) => {
        if (payload && payload.length) {
          const item = payload[0].payload;
          const keysToShow = ["CompanyName", "ContactName", "ContactTitle", "Address", "City", "Region", "Country"];
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
      };
      break;
    case "Orders":
      nameKey = "EmployeeID";
      dataKey = "Freight";
      title = "Order Data";
      tooltipContent = ({ payload }) => {
        if (payload && payload.length) {
          const item = payload[0].payload;
          const keysToShow = ["CustomerID", "OrderID", "ShipAddress", "ShipCity", "ShipPostalCode", "ShipCountry"];
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
      };
      break;
    case "Employees":
      nameKey = "EmployeeID";
      dataKey = "ReportsTo";
      title = "Employee Data";
      tooltipContent = ({ payload }) => {
        if (payload && payload.length) {
          const item = payload[0].payload;
          const keysToShow = ["EmployeeID", "FirstName", "PostalCode", "Address", "City", "Title", "Country"];
          return (
            <div style={{ backgroundColor: "#f7f2f2", padding: "5px" }}>
              {keysToShow.map((key) => (
                <p key={key}>
                  <strong>{key === "TitleOfCourtesy" ? "Name" : key}:</strong> {key === "TitleOfCourtesy" ? `${item[key]} ${item["FirstName"]}` : item[key]}
                  </p>
              ))}
            </div>
          );
        }
        return null;
      };
      break;
    case "EmployeeTerritories":
      nameKey = "EmployeeID";
      dataKey = "EmployeeID";
      title = "Employee Territories Data";
      tooltipContent = ({ payload }) => {
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
      };
      break;
    case "Products":
      nameKey = "ProductID";
      dataKey = "UnitPrice";
      title = "Product Data";
      tooltipContent = ({ payload }) => {
        if (payload && payload.length) {
          const item = payload[0].payload;
          const keysToShow = ["ProductID", "ProductName", "QuantityPerUnit", "UnitPrice", "UnitsInStock", "UnitsOnOrder", "Discontinued", "ReorderLevel"];
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
      };
      break;
    case "Regions":
      nameKey = "RegionDescription";
      dataKey = "RegionID";
      title = "Region Data";
      tooltipContent = ({ payload }) => {
        if (payload && payload.length) {
          const item = payload[0].payload;
          const keysToShow = ["RegionID", "RegionDescription"];
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
      };
      break;
    case "Suppliers":
      nameKey = "SupplierID";
      dataKey = "SupplierID";
      title = "Supplier Data";
      tooltipContent = ({ payload }) => {
        if (payload && payload.length) {
          const item = payload[0].payload;
          const keysToShow = ["SupplierID", "CompanyName", "ContactName"];
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
      };
      break;
    case "Territories":
      nameKey = "TerritoryID";
      dataKey = "RegionID";
      title = "Territory Data";
      tooltipContent = ({ payload }) => {
        if (payload && payload.length) {
          const item = payload[0].payload;
          const keysToShow = ["RegionID", "TerritoryID", "TerritoryDescription"];
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
      };
      break;
    case "KPIDefinitions":
      nameKey = "RelevantDimensions";
      dataKey = "KPIID";
      title = "KPI Definitions Data";
      tooltipContent = ({ payload }) => {
        if (payload && payload.length) {
          const item = payload[0].payload;
          const keysToShow = ["KPIID", "KPIName", "RelevantDimensions", "Description"];
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
      };
      break;
    default:
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
    const csvData = convertToCSV(data[dataType]);
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
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5">{title}</Typography>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        {data[dataType] ? (
          <>
            <PieChart width={400} height={250}>
              <Pie
                data={data[dataType]}
                dataKey={dataKey}
                nameKey={nameKey}
                cx="50%"
                cy="50%"
                innerRadius={5}
                outerRadius={80}
                fill="#82ca9d"
                label
              >
                {data[dataType].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={tooltipContent} />
            </PieChart>
          </>
        ) : (
          <Typography variant="h6">No data available</Typography>
        )}
        <Box>
          <MdDelete onClick={() => handleDelete(id)} style={{ cursor: "pointer" }} />
          <MdDownload onClick={() => downloadCSV(data)} style={{ cursor: "pointer" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default PieChartComponent;



