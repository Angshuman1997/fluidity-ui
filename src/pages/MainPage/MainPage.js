import React, { useEffect, useState } from "react";
import { BiDrink } from "react-icons/bi";
import { styled } from "styled-components";
import ModCard from "../../components/ModCard/ModCard";
import axios from "axios";
import PopupModal from "../../components/PopupModal/PopupModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notificationFunc } from "../../redux/actions/actions";
import MenuComp from "../../components/MenuComp/MenuComp";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import SearchBar from "../../components/SearchBar/SearchBar";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [drinksData, setDrinksData] = useState([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [serVal, setSerVal] = React.useState("");
  const [enableSer, setEnableSer] = React.useState(false);
  const [serEnt, setSerEnt] = React.useState(false);
  const [popupContentId, setPopupContentId] = React.useState("");
  const handleClose = () => setOpenPopup(false);
  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/drinks`, {
        headers: {
          offset: `${offset}`,
          search: serVal.trim(),
          Authorization: sessionStorage.getItem("fludtyTok"),
        },
      })
      .then((response) => {
        if (response.status === 440 || response.status === 401) {
          dispatch(
            notificationFunc({
              open: true,
              severity: "error",
              message:
                response.status === 440
                  ? "Session Expired"
                  : "Something Went Wrong",
            })
          );
          sessionStorage.removeItem("fludtyTok");
          navigate("/login");
        } else {
          setTotal(response.data.total);
          setDrinksData([...drinksData, ...response.data.data]);
        }
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 440) {
          dispatch(
            notificationFunc({
              open: true,
              severity: "error",
              message:
                error.response.status === 440
                  ? "Session Expired"
                  : "Something Went Wrong",
            })
          );
          sessionStorage.removeItem("fludtyTok");
          navigate("/login");
        } else {
          dispatch(
            notificationFunc({
              open: true,
              severity: "error",
              message: error.message,
            })
          );
        }
      });
  };

  const handleLoadMore = () => {
    setOffset((prev) => prev + 10);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  useEffect(() => {
    if (serEnt) {
      getData();
      setSerEnt(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serEnt]);

  const handleChange = (event) => {
    setSerVal(event.target.value);
  };

  const handlePress = (event) => {
    if (event.key === "Enter") {
      setEnableSer(true);
      setSerEnt(true);
      setDrinksData([]);
    }
  };

  const handleClick = () => {
    setEnableSer(true);
    setSerEnt(true);
    setDrinksData([]);
  };

  const handleSerRemove = () => {
    setSerVal("");
    setSerEnt(true);
    setDrinksData([]);
    setEnableSer(false);
  };

  return (
    <React.Fragment>
      <Compo>
        <TopContent>
          <LogoTxt>
            <span className="logo">
              <BiDrink size={30} />
            </span>
            <span className="text">FluDtY</span>
          </LogoTxt>
          <SearchBar
            serVal={serVal}
            handleChange={handleChange}
            handlePress={handlePress}
            handleClick={handleClick}
            enableSer={enableSer}
            handleSerRemove={handleSerRemove}
          />
          <MenuFeature>
            <MenuComp />
          </MenuFeature>
        </TopContent>
        <MiddleContent>
          {drinksData?.length > 0 ? (
            <React.Fragment>
              {Object.keys(drinksData).map((i, index) => {
                const data = JSON.parse(drinksData[i]);
                return (
                  <Card
                    key={`${i}-${index}`}
                    onClick={() => {
                      setPopupContentId(data._id.$oid);
                      setOpenPopup(true);
                    }}
                  >
                    <ModCard image={data.image} name={data.name} />
                  </Card>
                );
              })}
              {drinksData?.length < total && (
                <LoadMore>
                  <LoadMoreButton onClick={handleLoadMore}>
                    Load More
                  </LoadMoreButton>
                </LoadMore>
              )}
            </React.Fragment>
          ) : (
            <SkeletonLoader />
          )}
        </MiddleContent>
      </Compo>
      {openPopup && (
        <PopupModal
          open={openPopup}
          handleClose={handleClose}
          popupContentId={popupContentId}
        />
      )}
    </React.Fragment>
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
  color: #ffffff !important;
`;

const TopContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  margin: 0.5rem 0 2rem 0;
  padding: 0 1rem;
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

const MenuFeature = styled.div``;

const MiddleContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Card = styled.div`
  padding: 1rem;
  cursor: pointer;
`;

const LoadMore = styled.div`
  margin: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoadMoreButton = styled.button`
  border: 0.2rem solid #ffffff;
  background: #ffffff;
  font-size: 1.2rem;
  border-radius: 0.8rem;
  cursor: pointer;
`;
