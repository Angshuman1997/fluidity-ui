import React from "react";
import { FaWineBottle } from "react-icons/fa";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch";
import { styled } from "styled-components";

const LoginPage = () => {
  return (
    <Compo>
      <TopContent>
        <LogoTxt>
          <span className="logo">
            <FaWineBottle size={30} />
          </span>
          <span className="text">FluDtY</span>
        </LogoTxt>
        <ThemeFeature>
          <ThemeSwitch />
        </ThemeFeature>
      </TopContent>
      <MiddleContent>
        <Form>
          <FormContent>
            <FormTitle>Sign In</FormTitle>
            <FieldSection>
              <Label>Email address</Label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </FieldSection>
            <FieldSection>
              <Label>User Id</Label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </FieldSection>
            <FieldSection>
              <Label>Password</Label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </FieldSection>
            <FieldSection>
              <Label>Confirm Password</Label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter smae password"
              />
            </FieldSection>
            <FieldBtnSection>
              <SubmitBtn
                type="button"
                className="btn btn-primary"
                onClick={() => alert("Submitted !!!")}
              >
                Submit
              </SubmitBtn>
            </FieldBtnSection>
          </FormContent>
          <LoginOption>
            <ForgetBtn>Forgot Password ?</ForgetBtn>
            <RegisterBtn>Register</RegisterBtn>
          </LoginOption>
        </Form>
      </MiddleContent>
    </Compo>
  );
};

export default LoginPage;

const Compo = styled.div`
  background: radial-gradient(
    circle,
    rgba(12, 4, 24, 1) 64%,
    rgba(33, 13, 55, 0.9864320728291317) 100%
  );
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

const ThemeFeature = styled.div``;

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
