import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "../../common/MainLayout";
import styled from "@emotion/styled/macro";
import Page from "../../common/Page";
import medicinesResource from "../../../helpers/api/medicines";
import { Button, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import employeesResource from "../../../helpers/api/employees";
import accountingsResource from "../../../helpers/api/accountings";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../atoms/auth";
import { DataGrid } from "@mui/x-data-grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Popup from "../../controls/Popup";
import AccountingInfoForm from "../../forms/AccountingInfoForm";

const initialValues = {
  id: 0,
  date: "",
  employee: { id: 0, fullName: "", department: { id: 0, name: "" } },
  income: false,
  user: { id: 0, fullName: "", username: "", email: "", role: "" },
  medicines: [],
};

const ComingPage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [openInfoPopup, setOpenInfoPopup] = useState(false);
  const [recordForInfo, setRecordForInfo] = useState(initialValues);

  useEffect(() => {
    const fetchData = async () => {
      const data = await accountingsResource.getIncomes();
      setRecords(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 100 },
      { field: "date", headerName: "Дата", flex: 1 },
      {
        field: "user",
        headerName: "Пользователь",
        flex: 1,
        renderCell: (params) => <span>{params.row.user.fullName}</span>,
      },
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
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => {
                  setRecordForInfo(params.row);
                  setOpenInfoPopup(true);
                }}
              >
                <InfoOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <Page title="Приходы">
      <MainLayout>
        {records.length === 0 ? (
          <Box>
            <h1>Приходы не найдены</h1>
          </Box>
        ) : (
          <Box>
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
            <Popup
              title="Приход"
              openPopup={openInfoPopup}
              setOpenPopup={setOpenInfoPopup}
            >
              {openInfoPopup && <AccountingInfoForm data={recordForInfo} />}
            </Popup>
          </Box>
        )}
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

export default ComingPage;
