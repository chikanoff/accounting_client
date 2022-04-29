import { Drawer } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { sidebarOpenState } from "../../../../atoms/sidebar";
import SidebarHeader from "./SidebarHeader";
import Link from "@mui/material/Link";
import useLogout from "../../../../hooks/useLogout";
import { currentUserState } from "../../../../atoms/auth";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const sidebarOpen = useRecoilValue(sidebarOpenState);
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();
  const logout = useLogout();
  console.log(currentUser);

  return (
    <Drawer
      sx={{
        width: 150,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 150,
          boxSizing: "border-box",
        },
      }}
      open={sidebarOpen}
      variant="persistent"
      anchor="center"
    >
      <SidebarHeader />
      <Box>
        <Box marginTop="10px">
          <Link
            marginLeft="20px"
            style={{ textDecoration: "none" }}
            onClick={() => navigate("/home")}
          >
            Home
          </Link>
        </Box>
        <Box marginTop="10px">
          <Link
            marginLeft="20px"
            style={{ textDecoration: "none" }}
            onClick={() => navigate("/userFiles")}
          >
            User Files
          </Link>
        </Box>
        <Box marginTop="10px">
          <Link
            marginLeft="20px"
            style={{ textDecoration: "none" }}
            onClick={() => navigate("/allFiles")}
          >
            Public Files
          </Link>
        </Box>
        <Box marginTop="10px">
          <Link
            marginLeft="20px"
            style={{ textDecoration: "none" }}
            onClick={() => navigate("/upload")}
          >
            Upload file
          </Link>
        </Box>
        {currentUser?.isAdmin && (
          <Box marginTop="10px">
            <Link
              marginLeft="20px"
              style={{ textDecoration: "none" }}
              onClick={() => navigate("/adminFiles")}
            >
              Admin files
            </Link>
          </Box>
        )}
        <Box marginTop="10px">
          <Link
            marginLeft="20px"
            style={{ textDecoration: "none" }}
            onClick={logout}
          >
            Logout
          </Link>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
