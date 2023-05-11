import React, { useEffect, useState } from "react";
import { FaWineBottle } from "react-icons/fa";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch";
import { styled } from "styled-components";
import ModCard from "../../components/ModCard/ModCard";
import axios from "axios";

const MainPage = () => {
  const [drinksData, setDrinksData] = useState([]);
  const getData = () => {
    axios
      .get("https://api-fludty.onrender.com/drinks")
      .then((response) => {
        setDrinksData(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

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
        {drinksData.length > 0 &&
          Object.keys(drinksData).map((i, index) => {
            const data = JSON.parse(drinksData[i]);
            return (
              <Card key={`${i}-${index}`}>
                <ModCard image={data.image} name={data.name} />
              </Card>
            );
          })}
      </MiddleContent>
    </Compo>
  );
};

export default MainPage;

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
  overflow-x: hidden;
  overflow-y: scroll;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  padding: 1rem;
`;
