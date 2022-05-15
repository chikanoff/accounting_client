import React from "react";
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import styled from "@emotion/styled";

const MedicineForm = ({ data }) => {
  return (
    <Grid item xs={12} md={6}>
      <List>
        <ListItem divider>
          <BoldTypography>Наименование</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.name} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Номер</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.number} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Поставщик</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.supplier.name} />
        </ListItem>

        <ListItem divider>
          <BoldTypography>Единица измерения</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.unit.name} />
        </ListItem>
      </List>
    </Grid>
  );
};

const BoldTypography = styled(Typography)`
  font-weight: bold;
  font-size: 1rem;
`;

export default MedicineForm;
