import "../../Styles/header.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { useState } from "react";

export default function Header() {
  const [burguer, setBurguer] = useState(false);
  const handleOpen = () => {
    setBurguer(true);
  };
  const handleClose = () => {
    setBurguer(false);
  };

  return (
    <div>
      <div className="header-box">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            gap: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 4, justifyContent:"space-between"}}>
            <Avatar
              onClick={handleOpen}
              alt="Gustavo"
              src="/static/images/avatar/1.jpg"
            />
            <Typography variant="h4" sx={{ fontFamily: "sans-serif" }}>
              Travel Planning
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ mr: 4 }}>
            About us
          </Typography>
          
          <Menu
            open={burguer}
            id="account-menu"
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 10,
                    width: 9,
                    height: 9,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Buy another ticket
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </div>
    </div>
  );
}