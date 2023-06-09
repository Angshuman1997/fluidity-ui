import React from "react";
import { BiDrink } from "react-icons/bi";
import bannerImg from "../../assets/images/banner_image.png";
import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [touched, setTouched] = useState(false);

  return (
    <Compo>
      <TopContent>
        <LogoTxt>
          <span className="logo">
            <BiDrink size={30} />
          </span>
          <span className="text">FluIditY</span>
        </LogoTxt>
      </TopContent>
      <MiddleContent>
        <MContent>
          <BannerImage>
            <img src={bannerImg} alt="banner" />
          </BannerImage>
          <TxtContent>
            <span className="large">Make your own drinks at home</span>
            <span className="small">
              A step by step recipes to make delicious drinks.
            </span>
            <LetsDrinkBtn
              touched={touched}
              onClick={() => navigate("/login")}
              onTouchEnd={() => {
                navigate("/login");
                setTouched(true);
              }}
            >
              <span>Let's Drink !!!</span>
            </LetsDrinkBtn>
          </TxtContent>
        </MContent>
      </MiddleContent>
    </Compo>
  );
};

export default HomePage;

const Compo = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  padding: 0 1rem;
  justify-content: space-between;
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
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LetsDrinkBtn = styled.button`
  background: #ffffff;
  border: 0.1rem solid #ffffff;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  padding: 0.5rem;
  font-size: 1.2rem;
  width: 10rem;
  height: 4rem;
  margin-top: 3rem;
  @media screen and (max-width: 480px) {
    width: 7rem;
    height: 2rem;
    margin-top: 1rem;
  }
  @media screen and (min-width: 1500px) {
    width: 15rem;
    height: 6rem;
  }

  span {
    font-family: Bahnschrift SemiBold;
    margin: 0;
    @media screen and (max-width: 480px) {
      font-size: 0.8rem;
    }

    @media screen and (min-width: 1500px) {
      font-size: 2rem;
    }
  }

  &:hover {
    transition: 0.3s;
    font-size: ${(props) => (props.touched ? "1.2rem" : "1.3rem")};
  }
`;

const MContent = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem 0 2rem;
  column-gap: 5%;
  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    gap: 2rem;
    margin: 0;
    margin: 3rem 0 0 0;
  }

  @media screen and (max-width: 300px) {
    margin: 0;
  }
`;

const TxtContent = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 480px) {
    align-items: center;
    justify-content: center;
  }

  span.large {
    font-weight: 600;
    font-size: 3rem;
    padding: 0 0 1rem 0;
    @media screen and (max-width: 480px) {
      font-size: 1rem;
      padding: 0;
    }

    @media screen and (min-width: 1500px) {
      font-size: 5rem;
    }
  }

  span.small {
    font-weight: 300;
    font-size: 1rem;
    @media screen and (max-width: 480px) {
      font-size: 0.5rem;
    }

    @media screen and (min-width: 1200px) {
      font-size: 1.5rem;
    }

    @media screen and (min-width: 2000px) {
      font-size: 3rem;
    }
  }
`;
const BannerImage = styled.div`
  img {
    width: 40vw;
    height: 75vh;
    @media screen and (max-width: 480px) {
      width: 40vw;
      height: 40vh;
    }

    @media screen and (max-width: 300px) {
      width: 40vw;
      height: 30vh;
    }

    @media screen and (min-width: 900px) {
      width: 30vw;
      height: 75vh;
    }

    @media screen and (min-width: 1100px) {
      width: 25vw;
      height: 75vh;
    }
  }
`;
