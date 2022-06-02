import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "../../common/MainLayout";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../../common/Page";
import departmentsResource from "../../../helpers/api/departments";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";
import DepartmentForm from "../../forms/DepartmentForm";
import Popup from "../../controls/Popup";

const initialValues = {
  id: 0,
  name: "",
};

const DepartmentPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(initialValues);

  const deleteDepartment = useCallback(
    async (deleteId) => {
      await departmentsResource.deleteById(deleteId);
      setRecords(records.filter(({ id }) => id !== deleteId));
    },
    [records]
  );

  const departmentColumns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ mr: 2 }}>
            <IconButton
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => {
                setRecordForEdit(params.row);
                setOpenPopup(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => {
                deleteDepartment(params.row.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ),
    },
  ];

  const addOrEdit = useCallback(async (data) => {
    if (data.id !== 0) {
      await departmentsResource.update(data.id, data);
    } else {
      await departmentsResource.create(data);
    }
    setOpenPopup(false);
    setRecordForEdit(initialValues);
    const res = await departmentsResource.getAll();
    setRecords(res);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await departmentsResource.getAll();
      setRecords(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Отделения">
      <MainLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            style={{ marginBottom: "1rem" }}
            onClick={() => {
              setRecordForEdit(initialValues);
              setOpenPopup(true);
            }}
          >
            Создать
          </Button>
        </Box>
        <Box height="100%">
          <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            autoHeight
            disableSelectionOnClick
            rows={records}
            columns={departmentColumns}
          />
        </Box>
        <Popup
          title="Отделение"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <DepartmentForm data={recordForEdit} onSubmit={addOrEdit} />
        </Popup>
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

export default DepartmentPage;
