import * as React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { notificationFunc } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

export default function LogOutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("fludtyTok");
    dispatch(
      notificationFunc({
        open: true,
        severity: "success",
        message: "Successfully Logged Out",
      })
    );
    navigate("/login");
  };

  return (
    <BtnContent>
      <Btn onClick={handleLogout}>
        <BtnLogo>
          <LogoutIcon />
        </BtnLogo>
        <BtnText>Logout</BtnText>
      </Btn>
    </BtnContent>
  );
}

const BtnContent = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 0.5rem;
`;
const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #ffffff;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  font-weight: 600;
  cursor: pointer;
  font-family: system-ui;
  font-size: 1rem;
`;
const BtnLogo = styled.div`
  display: flex;
`;
const BtnText = styled.div`
  display: flex;
`;
