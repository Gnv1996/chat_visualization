import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { MdDelete } from "react-icons/md";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const TableChart = ({
  userData,
  handleDelete,
  id,
  handleInsideSelect,
  optionData,
  chartType
}) => {
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const columns = useMemo(() => {
    if (!userData || userData.length === 0) return [];
    const sampleItem = userData[0];
    return Object.keys(sampleItem).map((key) => ({
      accessorKey: key,
      header: key,
    }));
  }, [userData]);

  const initialState = useMemo(() => {
    const columnPinning = {
      left: [columns[0]?.accessorKey], // First column as sticky
      right: [columns[columns.length - 1]?.accessorKey], // Last column as sticky
    };

    return { columnPinning };
  }, [columns]);

  const table = useMaterialReactTable({
    columns,
    data: userData,
    enableColumnActions: false,
    enableColumnPinning: true,
    enableColumnFilters: false,
    enablePagination: true,
    paginationPageSize: 10,
    enableSorting: false,
    layoutMode: "grid-no-grow",
    paginationDisplayMode: "pages",
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    initialState,
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default,
    }),
    muiTableBodyRowProps: { hover: true },
    muiTableProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        fontWeight: "bold",
        bgcolor: "lightgrey",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        py: "2px",
      },
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data or Download CSV
        </Button>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(id)}
        >
          <MdDelete size={24} cursor="pointer" color="#f76f86" />
          <Typography>Remove</Typography>
        </Box>
        <Box>
          <Select
            sx={{ width: "100px" }}
            value={chartType}
            displayEmpty
            size="small"
            onChange={(e) => handleInsideSelect(e, id)}
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
      </Box>
    ),
  });

  return (
    <Box>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export { TableChart };
