import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { notificationFunc } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

export default function MenuComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("fludtyTok");
    dispatch(notificationFunc({ open: true, severity: "success", message: "Successfully Logged Out" }));
    setAnchorEl(null);
        navigate("/login");
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        onTouchEnd={handleClick}
      >
        <MenuIcon sx={{ color: "#ffffff", width: "2rem", height: "2rem" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiList-root": {
            padding: "0rem",
          }
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLogout} onTouchEnd={handleLogout} >
          <Content>
            <Logo>
              <LogoutIcon />
            </Logo>
            <Text>Logout</Text>
          </Content>
        </MenuItem>
      </Menu>
    </div>
  );
}

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.div`
  font-weight: 600;
`;
