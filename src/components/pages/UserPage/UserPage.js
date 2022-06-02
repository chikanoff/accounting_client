import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "../../common/MainLayout";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../../common/Page";
import usersResource from "../../../helpers/api/users";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";
import UserForm from "../../forms/UserForm";
import Popup from "../../controls/Popup";

const initialValues = {
  id: 0,
  fullName: "",
  email: "",
  username: "",
  password: "",
  role: "ROLE_USER",
};

const UserPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(initialValues);

  const deleteRecord = useCallback(async (deleteId) => {
    await usersResource.deleteById(deleteId);
    const res = await usersResource.getAll();
    setRecords(res);
  }, []);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 100 },
      { field: "fullName", headerName: "ФИО", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "username", headerName: "Username", flex: 1 },
      { field: "role", headerName: "Роль", flex: 1 },
      {
        field: "action",
        headerName: "Действия",
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
                  console.log(params.row);
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
    let res;
    if (data.id !== 0) {
      res = await usersResource.update(data.id, data);
    } else {
      res = await usersResource.create(data);
    }
    if (res.status === 409) {
      alert(res.data.message);
    } else {
      setOpenPopup(false);
      setRecordForEdit(initialValues);
      const res = await usersResource.getAll();
      setRecords(res);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await usersResource.getAll();
      setRecords(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Пользователи">
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
          title="Пользователь"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          {openPopup && <UserForm data={recordForEdit} onSubmit={addOrEdit} />}
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

export default UserPage;
