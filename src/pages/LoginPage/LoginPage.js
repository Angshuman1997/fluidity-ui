import React, { useEffect, useState } from "react";
import { BiDrink } from "react-icons/bi";
import { styled } from "styled-components";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { notificationFunc } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { CircularProgress } from "@mui/material";
import { jumbleFunc } from "../../utils/utils";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginType, setLoginType] = useState("login");
  const [disableElement, setDisableElement] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    userid: "",
    password: "",
    email: "",
    name: "",
    regpassword: "",
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

  const handleRegister = () => {
    setLoginType(loginType === "register" ? "login" : "register");
    setLoginInfo({
      userid: "",
      password: "",
      email: "",
      name: "",
      regpassword: "",
      showPassword: false,
      showRegpassword: false,
    });
  };

  const handleFP = () => {};

  const loginAction = () => {

    setDisableElement(true);
    const mot = process.env.REACT_APP_SECRET_MOTION;
    const pat =(process.env.REACT_APP_SECRET_PATTERN).split(",");

    const formData = new FormData();
    formData.append("lt", loginType);
    formData.append("ud", jumbleFunc(loginInfo.userid.trim(), pat, mot));
    
    if (loginType === "register") {
      formData.append("pd", jumbleFunc(loginInfo.regpassword.trim(), pat, mot));
      formData.append("ne", jumbleFunc(loginInfo.name.trim(), pat, mot));
      formData.append("el", jumbleFunc(loginInfo.email.trim(), pat, mot));
    } else{
      formData.append("pd", jumbleFunc(loginInfo.password.trim(), pat, mot));
    }

    axios
      .post(`${process.env.REACT_APP_API_URI}/${loginType}`, formData)
      .then((response) => {
        loginType !== "register" &&
          sessionStorage.setItem("fludtyTok", response.data.token);
        dispatch(
          notificationFunc({
            open: true,
            severity: "success",
            message:
              loginType === "register"
                ? "Registration Successful"
                : "Login Successful",
          })
        );
        loginType === "register" ? navigate("/login") : navigate("/main");
        loginType === "register" && setLoginType("login");
        setDisableElement(false);
      })
      .catch((error) => {
        dispatch(
          notificationFunc({
            open: true,
            severity: "error",
            message: error.response.data.Message || error.message,
          })
        );
        setDisableElement(false);
      });
  };

  useEffect(() => {
    if (sessionStorage.getItem("fludtyTok") !== null) {
      navigate("/main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = () => {
    if (loginType === "register") {
      if (
        loginInfo.userid !== "" &&
        loginInfo.email !== "" &&
        loginInfo.name !== "" &&
        loginInfo.regpassword.length >= 8
      ) {
        loginAction();
      } else {
        dispatch(
          notificationFunc({
            open: true,
            severity: "warning",
            message: "Please check the input fields",
          })
        );
      }
    } else {
      if (loginInfo.userid !== "" && loginInfo.password !== "") {
        loginAction();
      } else {
        dispatch(
          notificationFunc({
            open: true,
            severity: "warning",
            message: "Please check user id and password",
          })
        );
      }
    }
  };

  const handlePress = (event) => {
    if (event.key === "Enter") {
      handleAction();
    }
  };

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
            <InneSecInput height={loginType === "register" ? "54vh" : "30vh"}>
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
                      onKeyDown={handlePress}
                      disabled={disableElement}
                      style={{
                        cursor: disableElement ? "not-allowed" : "pointer",
                        opacity: disableElement ? 0.5 : 1,
                      }}
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
                      onKeyDown={handlePress}
                      disabled={disableElement}
                      style={{
                        cursor: disableElement ? "not-allowed" : "pointer",
                        opacity: disableElement ? 0.5 : 1,
                      }}
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
                    onKeyDown={handlePress}
                    disabled={disableElement}
                    style={{
                      cursor: disableElement ? "not-allowed" : "pointer",
                      opacity: disableElement ? 0.5 : 1,
                    }}
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
                      onKeyDown={handlePress}
                      disabled={disableElement}
                      style={{
                        cursor: disableElement ? "not-allowed" : "pointer",
                        opacity: disableElement ? 0.5 : 1,
                      }}
                    />
                    <button type="button" onClick={handleClickShowPassword}>
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
                      placeholder="Enter password"
                      value={loginInfo.regpassword}
                      onChange={handleChange("regpassword")}
                      onKeyDown={handlePress}
                      disabled={disableElement}
                      style={{
                        cursor: disableElement ? "not-allowed" : "pointer",
                        opacity: disableElement ? 0.5 : 1,
                      }}
                    />
                    <button type="button" onClick={handleClickShowRegPassword}>
                      <RemoveRedEyeIcon />
                    </button>
                  </InputSec>
                  <PassRegInfo>
                    *Please given minimum 8 character length password
                  </PassRegInfo>
                </FieldSection>
              )}
            </InneSecInput>
            <FieldBtnSection>
              <SubmitBtn
                type="button"
                className="btn btn-primary"
                onClick={handleAction}
                disabled={disableElement}
                style={{
                  cursor: disableElement ? "not-allowed" : "pointer",
                  opacity: disableElement ? 0.5 : 1,
                }}
              >
                {disableElement ? (
                  <CircularProgress size={20} sx={{ color: "#e4e9ed" }} />
                ) : (
                  "Submit"
                )}
              </SubmitBtn>
            </FieldBtnSection>
          </FormContent>
          <LoginOption>
            <ForgetBtn type="button" onClick={handleFP} disabled>
              Forgot Password ?
            </ForgetBtn>
            <RegisterBtn
              type="button"
              onClick={handleRegister}
              disabled={disableElement}
              style={{
                cursor: disableElement ? "not-allowed" : "pointer",
                opacity: disableElement ? 0.5 : 1,
              }}
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
  height: ${(prop) => prop.height};
  overflow-x: hidden;
  overflow-y: scroll;
  transition: 0.3s;

  @media screen and (min-width: 1440px) {
    height: 100%;
  }

  @media screen and (max-width: 800px) {
    height: ${(prop) => prop.height === "54vh" ? "35vh" : prop.height === "30vh" ? "30vh" : "100%"};
  }

  @media screen and (max-width: 480px) {
    height: ${(prop) => prop.height === "30vh" ? "30vh" : "35vh"};
  }

 
`;

const InputSec = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  border: 1pxrem solid #feffff;
  padding: 0.2rem 0.3rem;
  border-radius: 0.5rem;
  height: 2rem;
  background: #2e657e;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  input {
    font-weight: 600;
    border: none;
    width: 100%;
    outline: none;
    font-family: Arial;
    font-size: 1rem;
    background: transparent;
    color: #e4e9ed;
    &::placeholder {
      color: #a5b8c7;
      opacity: 1;
    }

    &:-ms-input-placeholder {
      color: #a5b8c7;
    }

    &::-ms-input-placeholder {
      color: #a5b8c7;
    }
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    color: #e4e9ed;
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
  padding: 1rem 2rem 2rem 2rem;
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
  margin: 1rem 0;
  font-size: 24px;
  color: rgb(34, 34, 34);
  font-weight: 800;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #000000;
  margin: 0 0 0.4rem 0.2rem;
`;

const FieldSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0.8rem 0;
`;

const SubmitBtn = styled.button`
  border: 0.1rem solid #bbb6b6;
  border-radius: 1rem;
  font-size: 1rem;
  padding: 0.7rem;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  background: #2e657e;
  color: #e4e9ed;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  height: 3rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
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
  @media screen and (max-width: 480px) {
    margin: 2rem 1rem 0 1rem;
  }
`;

const ForgetBtn = styled.button`
  opacity: 0;
  cursor: initial;
`;

const RegisterBtn = styled.button`
  display: flex;
  border: 0.1rem solid #dddada;
  outline: none;
  background: #2e657e;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  color: #e4e9ed;
  cursor: pointer;
  width: 6rem;
  align-items: center;
  justify-content: center;
  height: 3rem;
  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.4rem 0;
    width: 5rem;
  }
`;

const PassRegInfo = styled.span`
  color: #524f4f;
  font-size: 0.75rem;
  margin: 0.2rem 0;
  font-weight: 500;
`;
