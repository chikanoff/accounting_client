import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import MainLayout from "../../common/MainLayout";
import styled from "@emotion/styled/macro";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../../common/Page";
import medicinesResource from "../../../helpers/api/medicines";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";
import MedicineForm from "../../forms/MedicineForm";
import Popup from "../../controls/Popup";
import MedicineInfoForm from "../../forms/MedicineInfoForm";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const initialValues = {
  id: 0,
  name: "",
  number: "",
  supplier: { id: 0, name: "" },
  unit: { id: 0, name: "" },
};

const MedicinePage = () => {
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(initialValues);
  const [openInfoPopup, setOpenInfoPopup] = useState(false);
  const [recordForInfo, setRecordForInfo] = useState(initialValues);

  const deleteRecord = useCallback(
    async (deleteId) => {
      await medicinesResource.deleteById(deleteId);
      const res = await medicinesResource.getAll();
      setRecords(res);
    },
    [records]
  );

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 100 },
      { field: "name", headerName: "Наименование", flex: 1 },
      { field: "number", headerName: "Номер", flex: 1 },
      {
        field: "supplier",
        headerName: "Поставщик",
        flex: 1,
        renderCell: (params) => <span>{params.row.supplier.name}</span>,
      },
      {
        field: "unit",
        headerName: "Ед. изм.",
        flex: 1,
        renderCell: (params) => <span>{params.row.unit.name}</span>,
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
      await medicinesResource.update(data.id, data);
    } else {
      await medicinesResource.create(data);
    }
    setOpenPopup(false);
    setRecordForEdit(initialValues);
    const res = await medicinesResource.getAll();
    setRecords(res);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await medicinesResource.getAll();
      setRecords(res);
    };
    fetchData();
  }, []);

  return (
    <Page title="Материалы">
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
          title="Материал"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          {openPopup && (
            <MedicineForm data={recordForEdit} onSubmit={addOrEdit} />
          )}
        </Popup>
        <Popup
          title="Информация"
          openPopup={openInfoPopup}
          setOpenPopup={setOpenInfoPopup}
        >
          {openInfoPopup && <MedicineInfoForm data={recordForInfo} />}
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

export default MedicinePage;
