import React, { useEffect, useState } from "react";
import { BiDrink } from "react-icons/bi";
import { styled } from "styled-components";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { notificationFunc } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginType, setLoginType] = useState("login");
  const [loginInfo, setLoginInfo] = useState({
    userid: "",
    password: "",
    email: "",
    name: "",
    regpassword: "",
    newpassword: "",
    showNewpassword: false,
    showPassword: false,
    showRegpassword: false,
  });

  const handleChange = (prop) => (event) => {
    setLoginInfo({ ...loginInfo, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setLoginInfo({
      ...loginInfo,
      showPassword: !loginInfo.showPassword,
    });
  };

  const handleClickShowRegPassword = () => {
    setLoginInfo({
      ...loginInfo,
      showRegpassword: !loginInfo.showRegpassword,
    });
  };

  const handleClickShowNewPassword = () => {
    setLoginInfo({
      ...loginInfo,
      showNewpassword: !loginInfo.showNewpassword,
    });
  };

  const handleRegister = () => {
    setLoginType(loginType === "register" ? "login" : "register");
    setLoginInfo({
      userid: "",
      password: "",
      email: "",
      name: "",
      regpassword: "",
      newpassword: "",
      showNewpassword: false,
      showPassword: false,
      showRegpassword: false,
    });
  };

  const handleFP = () => {};

  const loginAction = () => {
    const formData = new FormData();
    formData.append("userid", loginInfo.userid);
    formData.append("password", loginInfo.password);
    formData.append("login_type", "login");
    axios
      .post(`${process.env.REACT_APP_API_URI}/login`, formData)
      .then((response) => {
        sessionStorage.setItem("fludtyTok", response.data.token);
        dispatch(
          notificationFunc({
            open: true,
            severity: "success",
            message: "Login Successful",
          })
        );
        navigate("/main");
      })
      .catch((error) => {
        dispatch(
          notificationFunc({
            open: true,
            severity: "error",
            message: error.message,
          })
        );
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("fludtyTok") !== null) {
      navigate("/main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Compo>
      <TopContent>
        <LogoTxt>
          <span className="logo">
            <BiDrink size={30} />
          </span>
          <span className="text">FluDtY</span>
        </LogoTxt>
      </TopContent>
      <MiddleContent>
        <Form>
          <FormContent>
            <FormTitle>Sign In</FormTitle>
            <InneSecInput height={loginType === "register" ? "50vh" : "30vh"}>
              {loginType === "register" && (
                <FieldSection>
                  <Label>Name</Label>
                  <InputSec>
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="Enter Name"
                      value={loginInfo.name}
                      onChange={handleChange("name")}
                    />
                  </InputSec>
                </FieldSection>
              )}
              {loginType === "register" && (
                <FieldSection>
                  <Label>Email address</Label>
                  <InputSec>
                    <input
                      type="email"
                      className="form-control mt-1"
                      placeholder="Enter email"
                      value={loginInfo.email}
                      onChange={handleChange("email")}
                    />
                  </InputSec>
                </FieldSection>
              )}
              <FieldSection>
                <Label>User Id</Label>
                <InputSec>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter user id"
                    value={loginInfo.userid}
                    onChange={handleChange("userid")}
                  />
                </InputSec>
              </FieldSection>
              {loginType !== "register" && (
                <FieldSection>
                  <Label>Password</Label>
                  <InputSec>
                    <input
                      type={loginInfo.showPassword ? "text" : "password"}
                      className="form-control mt-1"
                      placeholder="Enter password"
                      value={loginInfo.password}
                      onChange={handleChange("password")}
                    />
                    <button
                      type="button"
                      onClick={handleClickShowPassword}
                    >
                      <RemoveRedEyeIcon />
                    </button>
                  </InputSec>
                </FieldSection>
              )}
              {loginType === "register" && (
                <FieldSection>
                  <Label>Add Password</Label>
                  <InputSec>
                    <input
                      type={loginInfo.showRegpassword ? "text" : "password"}
                      className="form-control mt-1"
                      placeholder="Enter same password"
                      value={loginInfo.regpassword}
                      onChange={handleChange("regpassword")}
                    />
                    <button
                      type="button"
                      onClick={handleClickShowRegPassword}
                    >
                      <RemoveRedEyeIcon />
                    </button>
                  </InputSec>
                </FieldSection>
              )}
              {loginType === "register" && (
                <FieldSection>
                  <Label>Confirm Password</Label>
                  <InputSec>
                    <input
                      type={loginInfo.showNewpassword ? "text" : "password"}
                      className="form-control mt-1"
                      placeholder="Enter same password"
                      value={loginInfo.newpassword}
                      onChange={handleChange("newpassword")}
                    />
                    <button
                      type="button"
                      onClick={handleClickShowNewPassword}
                    >
                      <RemoveRedEyeIcon />
                    </button>
                  </InputSec>
                </FieldSection>
              )}
              </InneSecInput>
              <FieldBtnSection>
                <SubmitBtn
                  type="button"
                  className="btn btn-primary"
                  onClick={loginAction}
                >
                  Submit
                </SubmitBtn>
              </FieldBtnSection>
          </FormContent>
          <LoginOption>
            <ForgetBtn
              type="button"
              onClick={handleFP}
              disabled
            >
              Forgot Password ?
            </ForgetBtn>
            <RegisterBtn
              type="button"
              onClick={handleRegister}
            >
              {loginType === "register" ? (
                <KeyboardDoubleArrowLeftIcon />
              ) : (
                "Register"
              )}
            </RegisterBtn>
          </LoginOption>
        </Form>
      </MiddleContent>
    </Compo>
  );
};

export default LoginPage;

const Compo = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #ffffff !important;
`;

const InneSecInput = styled.div`
  width: 100%;
  height: ${(prop)=>prop.height};
  overflow-x: hidden;
  overflow-y: scroll;
  transition: 0.3s;
  @media screen and (max-width: 800px) {
    height: 40vh;
  }

  @media screen and (min-width: 1440px) {
    height: 100%;
  }
`;

const InputSec = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  border: 0.1rem solid #000000;
  padding: 0.2rem 0.3rem;
  border-radius: 0.5rem;
  height: 2rem;
  input {
    border: none;
    width: 100%;
    outline: none;
    font-family: Arial;
    font-size: 1rem;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
`;

const TopContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  margin: 0.5rem 0;
`;

const LogoTxt = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5%;
  span.text {
    font-size: 1.5rem;
    font-family: Bahnschrift SemiBold;
    font-weight: 700;
    margin: 0.5rem 0 0 0;
  }

  span.logo {
    display: flex;
    align-items: center;
  }
`;

const MiddleContent = styled.div`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Form = styled.form`
  width: 420px;
  box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
  border-radius: 8px;
  background-color: white;
  padding: 0 0 1rem 0;
`;

const FormContent = styled.div`
  padding-left: 12%;
  padding-right: 12%;
  @media screen and (max-width: 400px) {
    padding: 0 1rem;
  }
`;

const FormTitle = styled.h3`
  text-align: center;
  margin: 1.5rem 0;
  font-size: 24px;
  color: rgb(34, 34, 34);
  font-weight: 800;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #000000;
  margin: 0 0 0.2rem 0;
`;

const FieldSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0.8rem 0;
`;

const SubmitBtn = styled.button`
  border: 0.2rem solid #000000;
  border-radius: 1rem;
  background: none;
  font-size: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: 600;
`;

const FieldBtnSection = styled.div`
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 1rem 0 1rem;
`;

const ForgetBtn = styled.button`
  opacity: 0;
  cursor: initial;
`;

const RegisterBtn = styled.button`
  display: flex;
  border: 0.1rem solid #dddada;
  outline: none;
  background: #6597cb;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 0.5rem;
  padding: 0.2rem 0;
  color: #e4e9ed;
  cursor: pointer;
  width: 6rem;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;
