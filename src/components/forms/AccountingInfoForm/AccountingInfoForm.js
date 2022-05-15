import React from "react";
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import styled from "@emotion/styled";

const AccountingInfoForm = ({ data }) => {
  return (
    <Grid item xs={12} md={6}>
      <List>
        <ListItem divider key="date">
          <BoldTypography>Дата</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.date} />
        </ListItem>

        <ListItem divider key="user">
          <BoldTypography>Пользователь</BoldTypography>
          <ListItemText sx={{ ml: 2 }} primary={data.user.fullName} />
        </ListItem>

        {!data.income && (
          <ListItem divider key="employee">
            <BoldTypography>Получатель</BoldTypography>
            <ListItemText
              sx={{ ml: 2 }}
              primary={data.employee.fullName}
              secondary={data.employee.department.name}
            />
          </ListItem>
        )}
        <BoldTypography sx={{ marginTop: 2 }} align="center">
          Медикаменты
        </BoldTypography>
        {data.medicines.map((med) => (
          <ListItem divider key={med.medicine.id}>
            <ListItemText
              sx={{ ml: 2 }}
              primary={med.medicine.name}
              secondary={`Кол-во: ${med.count}; Цена: ${med.price}`}
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

const BoldTypography = styled(Typography)`
  font-weight: bold;
  font-size: 1rem;
`;

export default AccountingInfoForm;
