import * as React from "react";
import Typography from "@mui/material/Typography";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

export default function PopoverComp({ placement = "bottom-end" }) {
  const { userCreds } = useSelector((state) => state);

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <AccButton {...bindToggle(popupState)}>
            <AccountCircleIcon sx={{ width: "2rem", height: "2rem" }} />
          </AccButton>
          <Popper {...bindPopper(popupState)} placement={placement} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <CloseBtnSec>
                    <CloseBtn {...bindToggle(popupState)}>
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
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
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
