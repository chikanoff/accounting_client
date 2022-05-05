import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import MainLayout from "../../common/MainLayout";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../../common/Page";
import medicinesResource from "../../../helpers/api/medicines";

const medicineColumns = [
  { field: "id", headerName: "Id", width: 100 },
  { field: "name", headerName: "Наименование", flex: 1 },
  { field: "number", headerName: "Номер", flex: 1 },
  { field: "supplier", headerName: "Поставщик", flex: 1 },
  { field: "unit", headerName: "Ед. изм.", flex: 1 },
  { field: "action", headerName: "Действия", flex: 1, sortable: false },
];

const MedicinePage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [medicineRows, setMedicineRows] = useState([]);

  useEffect(async () => {
    const fetchData = async () => {
      const res = await medicinesResource.getAll();
      console.log(res);
      setMedicineRows(
        res.map((medicine) => ({
          ...medicine,
          supplier: medicine.supplier.name,
          unit: medicine.unit.name,
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <Page title="Medicines">
      <MainLayout>
        <Box height="100%">
          <DataGrid
            pagination
            rowsPerPageOptions={[10, 20, 40]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            autoHeight
            rows={medicineRows}
            columns={medicineColumns}
            checkboxSelection
            onSelectionModelChange={(ids) => setSelectedRows(ids)}
          />
        </Box>
      </MainLayout>
    </Page>
  );
};

const MainBox = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export default MedicinePage;
