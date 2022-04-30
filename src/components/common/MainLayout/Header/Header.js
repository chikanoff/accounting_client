import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled/macro";
import { AppBar, Box, Button, Typography } from "@mui/material";
import { useMemo } from "react";
import FlexContainer from "../../FlexContainer";
import Link from "@mui/material/Link";

const Header = () => {
  const navigate = useNavigate();
  const menuItems = useMemo(
    () => /* user.type === 'admin' ? [...] : [...] */ [
      { name: "Главная", path: "/" },
      { name: "Материалы", path: "/medicines" },
      { name: "Получатели", path: "/employees" },
      { name: "Поставщики", path: "/suppliers" },
      { name: "Пользователи", path: "/users" },
      { name: "Отделения", path: "/departments" },
    ],
    [
      /*user?.type*/
    ]
  );

  return (
    <AppBar>
      <FlexContainer>
        <MenuWrapper fullHeight xs={{ height: "100%" }}>
          <MenuItemsWrapper>
            {menuItems.map(({ name, path }, index) => (
              <MenuItem key={index}>
                <Box>
                  <MenuLink href={path}>{name}</MenuLink>
                </Box>
              </MenuItem>
            ))}
          </MenuItemsWrapper>
          <MenuActions>
            <MenuItem>
              <Typography>User Full Name</Typography>
            </MenuItem>
            <MenuItem>
              <Button variant="secondary">Выход</Button>
            </MenuItem>
          </MenuActions>
        </MenuWrapper>
      </FlexContainer>
    </AppBar>
  );
};

const MenuLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const MenuWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const MenuItem = styled(Box)`
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuItemsWrapper = styled(Box)`
  display: flex;
`;

const MenuActions = styled(Box)`
  display: flex;
`;

export default Header;
