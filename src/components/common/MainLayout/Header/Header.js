import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled/macro";
import { AppBar, Box, Button, Typography } from "@mui/material";
import { useMemo } from "react";
import FlexContainer from "../../FlexContainer";
import Link from "@mui/material/Link";
import useLogout from "../../../../hooks/useLogout";
import { currentUserState } from "../../../../atoms/auth";
import { useRecoilValue } from "recoil";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();
  const user = useRecoilValue(currentUserState);
  const menuItems = useMemo(() =>
    user.admin
      ? [
          { name: "Главная", path: "/" },
          { name: "Материалы", path: "/medicines" },
          { name: "Получатели", path: "/employees" },
          { name: "Поставщики", path: "/suppliers" },
          { name: "Пользователи", path: "/users" },
          { name: "Отделения", path: "/departments" },
        ]
      : [
          { name: "Главная", path: "/" },
          { name: "Материалы", path: "/medicines" },
          { name: "Учет", path: "/accounting" },
          { name: "Приходы", path: "/comings" },
          { name: "Расходы", path: "/consumptions" },
          { name: "Отчеты", path: "/reports" },
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
                  {location.pathname === path ? (
                    <ActiveMenuButton onClick={() => navigate(path)}>
                      {name}
                    </ActiveMenuButton>
                  ) : (
                    <MenuButton onClick={() => navigate(path)}>
                      {name}
                    </MenuButton>
                  )}
                </Box>
              </MenuItem>
            ))}
          </MenuItemsWrapper>
          <MenuActions>
            <MenuItem>
              <Typography style={{ color: "white" }}>
                {user.username}
              </Typography>
            </MenuItem>
            <MenuItem>
              <Button variant="contained" color="primary" onClick={logout}>
                <Typography
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "0.8rem",
                  }}
                >
                  Выход
                </Typography>
              </Button>
            </MenuItem>
          </MenuActions>
        </MenuWrapper>
      </FlexContainer>
    </AppBar>
  );
};

const MenuButton = styled(Link)`
  color: #f0f8ff;
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    color: #b0c4de;
  }
`;
const ActiveMenuButton = styled(Link)`
  color: #b0c4de;
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
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
