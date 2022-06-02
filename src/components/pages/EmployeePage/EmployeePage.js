import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "../../common/MainLayout";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../../common/Page";
import employeesResource from "../../../helpers/api/employees";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";
import EmployeeForm from "../../forms/EmployeeForm";
import Popup from "../../controls/Popup";

const initialValues = {
  id: 0,
  fullName: "",
  department: { id: 0, name: "" },
};

const EmployeePage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(initialValues);

  const deleteRecord = useCallback(
    async (deleteId) => {
      await employeesResource.deleteById(deleteId);
      setRecords(records.filter(({ id }) => id !== deleteId));
    },
    [records]
  );

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 100 },
      { field: "fullName", headerName: "Full Name", flex: 1 },
      {
        field: "department",
        headerName: "Department",
        flex: 1,
        renderCell: (params) => <span>{params.row.department.name}</span>,
      },
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
                color="primary"
                size="small"
                onClick={() => {
                  const departmentId = records.find(
                    (record) => record.id === params.row.id
                  )?.department?.id;
                  setRecordForEdit(params.row);
                  setOpenPopup(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  deleteRecord(params.row.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ),
      },
    ],
    []
  );

  const addOrEdit = useCallback(async (data) => {
    if (data.id !== 0) {
      await employeesResource.update(data.id, data);
    } else {
      await employeesResource.create(data);
    }
    setOpenPopup(false);
    setRecordForEdit(initialValues);
    const res = await employeesResource.getAll();
    setRecords(res);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await employeesResource.getAll();
      setRecords(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Работники">
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
            columns={columns}
          />
        </Box>
        <Popup
          title="Работник"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          {openPopup && (
            <EmployeeForm data={recordForEdit} onSubmit={addOrEdit} />
          )}
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

export default EmployeePage;
