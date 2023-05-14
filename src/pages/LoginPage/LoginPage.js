import React, { useEffect, useState } from "react";
import { BiDrink } from "react-icons/bi";
import { styled } from "styled-components";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { notificationFunc } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";

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
    setLoginType("register");
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
            {loginType === "register" && (
              <FieldSection>
                <Label>Name</Label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter Name"
                  value={loginInfo.name}
                  onChange={handleChange("name")}
                />
              </FieldSection>
            )}
            {loginType === "register" && (
              <FieldSection>
                <Label>Email address</Label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  value={loginInfo.email}
                  onChange={handleChange("email")}
                />
              </FieldSection>
            )}
            <FieldSection>
              <Label>User Id</Label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter useid"
                value={loginInfo.userid}
                onChange={handleChange("userid")}
              />
            </FieldSection>
            {loginType !== "register" && (
              <FieldSection>
                <Label>Password</Label>
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
                  onTouchEnd={handleClickShowPassword}
                >
                  <RemoveRedEyeIcon />
                </button>
              </FieldSection>
            )}
            {loginType === "register" && (
              <FieldSection>
                <Label>Add Password</Label>
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
                  onTouchEnd={handleClickShowRegPassword}
                >
                  <RemoveRedEyeIcon />
                </button>
              </FieldSection>
            )}
            {loginType === "register" && (
              <FieldSection>
                <Label>Confirm Password</Label>
                <input
                  type={loginInfo.showNewpassword ? "text" : "password"}
                  className="form-control mt-1"
                  placeholder="Enter smae password"
                  value={loginInfo.newpassword}
                  onChange={handleChange("newpassword")}
                />
                <button
                  type="button"
                  onClick={handleClickShowNewPassword}
                  onTouchEnd={handleClickShowNewPassword}
                >
                  <RemoveRedEyeIcon />
                </button>
              </FieldSection>
            )}
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
            <ForgetBtn type="button" onClick={handleFP} onTouchEnd={handleFP}>
              Forgot Password ?
            </ForgetBtn>
            <RegisterBtn
              type="button"
              onClick={handleRegister}
              onTouchEnd={handleRegister}
            >
              Register
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
  padding: 0 1rem;
  color: #ffffff !important;
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
  padding: 5rem;
`;

const Form = styled.form`
  width: 420px;
  box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
  padding-top: 30px;
  padding-bottom: 20px;
  border-radius: 8px;
  background-color: white;
`;

const FormContent = styled.div`
  padding-left: 12%;
  padding-right: 12%;
`;

const FormTitle = styled.h3`
  text-align: center;
  margin-bottom: 1em;
  font-size: 24px;
  color: rgb(34, 34, 34);
  font-weight: 800;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: rgb(34, 34, 34);
`;

const FieldSection = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 2rem 0 2rem;
`;

const ForgetBtn = styled.button``;

const RegisterBtn = styled.button``;
