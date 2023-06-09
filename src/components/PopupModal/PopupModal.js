import * as React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notificationFunc, userCredsFunc } from "../../redux/actions/actions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function PopupModal({ open, handleClose, popupContentId, drinksData, setDrinksData, setTotal, favSort }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userCreds } = useSelector((state) => state);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [content, setContent] = React.useState(null);
  const [fav, setFav] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  const favStageUpdate = (drinkId) => {
    const temp = [];
    Object.keys(drinksData).forEach((i) => {
      const obj = JSON.parse(drinksData[i]);
      if (obj._id.$oid !== drinkId) {
        const temp2 = { ...obj };
        temp.push(JSON.stringify(temp2));
      }
    });
    setTotal(prev=>prev-1);
    setDrinksData(temp);
    handleClose();
  };

  const modifyFav = (drinkId, userid, action) => {
    const temp = [];
    Object.keys(drinksData).forEach((i) => {
      const obj = JSON.parse(drinksData[i]);
      let newFav = [...obj.favourite];
      if (obj._id.$oid === drinkId) {
        if (action === "remove") {
          newFav = newFav.filter(function (item) {
            return item !== userid;
          });
        } else {
          newFav.push(userid);
        }
      }
      const temp2 = { ...obj };
      temp2["favourite"] = newFav;
      temp.push(JSON.stringify(temp2));
    });

    setDrinksData(temp);
  };

  const getOneData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/drinks/${popupContentId}`, {
        headers: {
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
          const allD = JSON.parse(response.data.data);
          setFav(allD.favourite?.includes(userCreds.userid))
          setContent(allD);
        }
        setLoader(false);
      })
      .catch((error) => {
        if (error?.response?.status === 401 || error?.response?.status === 440) {
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

  React.useEffect(() => {
    getOneData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickFav = (event) => {
    setLoader(true);
    event.stopPropagation();
    axios
      .put(
        `${process.env.REACT_APP_API_URI}/favdrink/${popupContentId}`,
        {},
        {
          headers: {
            fav_type: fav ? "remove" : "add",
            userid: userCreds.userid,
            Authorization: sessionStorage.getItem("fludtyTok"),
          },
        }
      )
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
          setFav((prev) => !prev);
          modifyFav(popupContentId, userCreds.userid, fav ? "remove" : "add");
          favSort && favStageUpdate(popupContentId);
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

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{
        "& .MuiPaper-root": {
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: "100%",
          width: "100%",

          "& ::-webkit-scrollbar": {
            width: "5px",
          },

          "& ::-webkit-scrollbar-track": {
            background: "transparent",
          },

          "& ::-webkit-scrollbar-thumb": {
            background: "#888888",
          },

          "& ::-webkit-scrollbar-thumb:hover": {
            background: "#555555",
          },
        },
      }}
    >
      {content === null ? (
        <Loader>
          <CircularProgress />
        </Loader>
      ) : (
        <MainContent>
          <TopSection>
            <FavBtn width={loader ? "" : "3rem"} height={loader ? "" : "2rem"} onClick={handleClickFav}>
              {loader ? <CircularProgress size={32} sx={{ color: "#000000", marginRight: '0.5rem' }}/> : fav ? <FavoriteIcon sx={{ color: "red" }}/> :<FavoriteBorderIcon />}
            </FavBtn>
            <button className="close-btn" onClick={handleClose}>
              <CloseIcon />
            </button>
          </TopSection>
          <Content>
            <ImageSection>
              <img src={content.image} alt={`${content.name}-img`} />
            </ImageSection>
            <NameSection>{content.name}</NameSection>
            <InnerContent>
              <IngredientSection>
                <IngdHead>Ingredients</IngdHead>
                <IngdBody>
                  {Object.keys(content.ingredients).map((i, index) => (
                    <div key={`${i}-${index}`} className="ingdContent">
                      <span className="ingdName">
                        {content.ingredients[i].name}
                      </span>
                      <span>-</span>
                      <span className="ingdAmount">
                        {content.ingredients[i].amount}
                      </span>
                    </div>
                  ))}
                </IngdBody>
              </IngredientSection>
              <StepSection>
                <StepHead>Steps</StepHead>
                <StepBody>
                  {Object.keys(content.steps).map((i, index) => (
                    <div key={`${i}-${index}`}>
                      <span>{index + 1}.&nbsp;</span>
                      <span>{content.steps[i]}</span>
                    </div>
                  ))}
                </StepBody>
              </StepSection>
            </InnerContent>
          </Content>
        </MainContent>
      )}
    </Dialog>
  );
}

const Loader = styled.div`
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const TopSection = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 0.5rem 1rem 0;
  align-items: center;
  button.close-btn {
    cursor: pointer;
    border: none;
    background: #000000;
    padding: 0.5rem;
    color: #ffffff;
    border-radius: 50%;
    display: flex;
  }
`;
const Content = styled.div`
  overflow-y: scroll;
  height: 100%;
`;
const ImageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 80%;
    height: 15rem;
    border-radius: 2rem;
  }
`;
const NameSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;
const InnerContent = styled.div`
  margin: 0 1rem 0.5rem 2rem;
`;

const IngredientSection = styled.div``;
const IngdHead = styled.div`
  font-size: 1.2rem;
  font-family: cursive;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const IngdBody = styled.div`
  div.ingdContent {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    font-weight: 600;
  }
  span.ingdName {
    width: 8rem;
  }
`;

const StepSection = styled.div`
  margin: 1rem 0;
`;
const StepHead = styled.div`
  font-size: 1.2rem;
  font-family: cursive;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const StepBody = styled.div`
  font-weight: 600;
`;

const FavBtn = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0.5rem;
  color: #000000;
  border-radius: 50%;
  display: flex;
  svg {
    width: ${(props) => (props.width)};
    height: ${(props) => (props.height)};
  }
`;
