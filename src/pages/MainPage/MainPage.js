import React, { useEffect, useState } from "react";
import { BiDrink } from "react-icons/bi";
import { styled } from "styled-components";
import ModCard from "../../components/ModCard/ModCard";
import axios from "axios";
import PopupModal from "../../components/PopupModal/PopupModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notificationFunc, userCredsFunc } from "../../redux/actions/actions";
import MenuComp from "../../components/MenuComp/MenuComp";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import SearchBar from "../../components/SearchBar/SearchBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import jwt_decode from "jwt-decode";
import PopoverComp from "../../components/PopoverComp/PopoverComp";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

const MainPage = () => {
  const { userCreds } = useSelector((state) => state);
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
  const [mobSearch, setMobSearch] = React.useState(false);
  const [favSort, setFavSort] = React.useState(false);
  const [loader, setLoader] = React.useState(true);

  const handleClose = () => setOpenPopup(false);
  const getData = () => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_API_URI}/drinks`, {
        headers: {
          offset: `${offset}`,
          favSort: `${favSort}`,
          userid: userCreds.userid,
          search: favSort ? "" : serVal.trim(),
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
          dispatch(userCredsFunc({}));
          navigate("/login");
        } else {
          setTotal(response.data.total);
          setDrinksData([...drinksData, ...response.data.data]);
        }
        setLoader(false);
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
          dispatch(userCredsFunc({}));
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
        setLoader(false);
      });
  };

  const handleLoadMore = () => {
    setOffset((prev) => prev + 10);
  };

  const getCreds = () => {
    const crd = jwt_decode(sessionStorage.getItem("fludtyTok"));
    dispatch(
      userCredsFunc({ userid: crd.user, name: crd.name, email: crd.email })
    );
  };

  useEffect(() => {
    getCreds();
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

  useEffect(() => {
    if (favSort) {
      getData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favSort]);

  const handleChange = (event) => {
    setSerVal(event.target.value);
  };

  const handlePress = (event) => {
    if (event.key === "Enter") {
      setEnableSer(true);
      setSerEnt(true);
      setDrinksData([]);
      setFavSort(false);
      setOffset(0);
    }
  };

  const handleClick = () => {
    setEnableSer(true);
    setSerEnt(true);
    setDrinksData([]);
    setFavSort(false);
    setOffset(0);
  };

  const handleSerRemove = () => {
    setSerVal("");
    setSerEnt(true);
    setDrinksData([]);
    setEnableSer(false);
    setFavSort(false);
    setOffset(0);
  };

  const handleOpenSearchBar = () => {
    setMobSearch(true);
  };

  const handleCloseSearchBar = () => {
    setMobSearch(false);
    enableSer && handleSerRemove();
  };

  const handleFavSort = () => {
    setSerVal("");
    setSerEnt(true);
    setDrinksData([]);
    setEnableSer(false);
    setOffset(0);
    setFavSort((prev) => !prev);
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
          <SearchContent>
            <SearchBar
              serVal={serVal}
              handleChange={handleChange}
              handlePress={handlePress}
              handleClick={handleClick}
              enableSer={enableSer}
              handleSerRemove={handleSerRemove}
            />
          </SearchContent>
          <FavouriteSeaction>
            <Favbtn onClick={handleFavSort}>
              {favSort ? (
                <HeartBrokenIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteIcon />
              )}
            </Favbtn>
          </FavouriteSeaction>
          <AccountSeaction>
            <PopoverComp />
          </AccountSeaction>
          <MenuFeature>
            <MenuComp />
          </MenuFeature>
        </TopContent>
        <MiddleContent>
        {!loader && drinksData.length === 0 ?
          <NoData>
              <h1>No Data Found</h1>
            </NoData> : 
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
                  <ModCard
                    image={data.image}
                    name={data.name}
                    favVal={data.favourite.includes(userCreds.userid)}
                    fdId={data._id.$oid}
                  />
                </Card>
              );
            })}
            {(!loader && drinksData.length < total) && (
              <LoadMore>
                <LoadMoreButton onClick={handleLoadMore}>
                  Load More
                </LoadMoreButton>
              </LoadMore>
            )}
          </React.Fragment>
        }
        {loader && <SkeletonLoader />}
        </MiddleContent>
        <BottomContent>
          {mobSearch ? (
            <React.Fragment>
              <SearchBar
                serVal={serVal}
                handleChange={handleChange}
                handlePress={handlePress}
                handleClick={handleClick}
                enableSer={enableSer}
                handleSerRemove={handleSerRemove}
              />
              <RemoveSer onClick={handleCloseSearchBar}>
                <SearchOffIcon />
              </RemoveSer>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <SortByFavBtn onClick={handleFavSort}>
                {favSort ? (
                  <HeartBrokenIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteIcon />
                )}
              </SortByFavBtn>
              <PopoverComp placement={"top"} />
              <SearchFeaBtn onClick={handleOpenSearchBar}>
                <SearchIcon />
              </SearchFeaBtn>
            </React.Fragment>
          )}
        </BottomContent>
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
  @media screen and (max-width: 500px) {
    justify-content: space-between;
  }
`;

const TopContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  margin: 0.5rem 0 2rem 0;
  padding: 0 1rem;
  @media screen and (max-width: 500px) {
    margin: 0.5rem 0 1rem 0;
  }
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
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoadMoreButton = styled.button`
  border: 0.2rem solid #ffffff;
  background: #ffffff;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.3rem;
  font-weight: 600;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchContent = styled.div`
  width: 100%;
  margin: 0 0.5rem 0 1rem;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const BottomContent = styled.div`
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  display: none;
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

const SortByFavBtn = styled.button`
  color: #ffffff;
  border: none;
  background: transparent;
  margin: 0 0.5rem;
`;

const SearchFeaBtn = styled.button`
  color: #ffffff;
  border: none;
  background: transparent;
  margin: 0 0.5rem;
`;

const FavouriteSeaction = styled.div`
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const AccountSeaction = styled.div`
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const Favbtn = styled.button`
  color: #ffffff;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const RemoveSer = styled.button`
  border: none;
  background: transparent;
  color: #ffffff;
  padding: 0.5rem;
  margin-left: 0.2rem;
`;

const NoData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 500px) {
    height: 25rem;
  }
`;
