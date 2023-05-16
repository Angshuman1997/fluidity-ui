import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import Popover from "@mui/material/Popover";

export default function PopoverComp() {
  const { userCreds } = useSelector((state) => state);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <AccButton onClick={handleClick}>
        <AccountCircleIcon sx={{ width: "2rem", height: "2rem" }} />
      </AccButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Paper>
          <CloseBtnSec>
            <CloseBtn onClick={handleClose}>
              <CloseIcon />
            </CloseBtn>
          </CloseBtnSec>
          <Typography sx={{ padding: "0 1rem 1rem 1rem" }}>
            <InnerContent>
              <SubSec>
                <SubSec1>Name</SubSec1>
                <span>:</span>
                <SubSec2>{userCreds.name}</SubSec2>
              </SubSec>
              <SubSec>
                <SubSec1>Userid</SubSec1>
                <span>:</span>
                <SubSec2>{userCreds.userid}</SubSec2>
              </SubSec>
              <SubSec>
                <SubSec1>Email</SubSec1>
                <span>:</span>
                <SubSec2>{userCreds.email}</SubSec2>
              </SubSec>
            </InnerContent>
          </Typography>
        </Paper>
      </Popover>
    </div>
  );
}

const SubSec1 = styled.span`
  width: 5rem;
`;
const SubSec2 = styled.span`
  width: 100%;
`;
const InnerContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 1rem 0 0;
`;
const SubSec = styled.div`
  display: flex;
  align-items: center;
  gap: 10%;
`;

const AccButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #ffffff;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;

const CloseBtnSec = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: flex-end;
`;
const CloseBtn = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
