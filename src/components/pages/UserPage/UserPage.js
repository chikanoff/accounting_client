import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MainLayout from "../../common/MainLayout";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../../common/Page";
import usersResource from "../../../helpers/api/users";

const userColumns = [
  { field: "id", headerName: "Id", width: 100 },
  { field: "fullName", headerName: "Full Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "username", headerName: "Username", flex: 1 },
  { field: "role", headerName: "Role", flex: 1 },
  { field: "action", headerName: "Actions", flex: 1, sortable: false },
];

const UserPage = () => {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await usersResource.getAll();
      setUserRows(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Users">
      <MainLayout>
        <Box height="100%">
          <DataGrid autoHeight rows={userRows} columns={userColumns} />
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

export default UserPage;
