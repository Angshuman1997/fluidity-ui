import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notificationFunc, userCredsFunc } from "../../redux/actions/actions";
import { CircularProgress } from "@mui/material";

export default function ModCard({
  image,
  name,
  fdId,
  drinksData,
  favSort,
  favVal,
  setDrinksData,
  setTotal
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userCreds } = useSelector((state) => state);
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

  const handleFavClick = (event) => {
    setLoader(true);
    event.stopPropagation();
    axios
      .put(
        `${process.env.REACT_APP_API_URI}/favdrink/${fdId}`,
        {},
        {
          headers: {
            fav_type: favVal ? "remove" : "add",
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
          modifyFav(fdId, userCreds.userid, favVal ? "remove" : "add");
          favSort && favStageUpdate(fdId);
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
    <Card
      sx={{
        display: "flex",
        width: "25rem",
        height: "10rem",
        alignItems: "center",
        borderRadius: "1.2rem",
        justifyContent: "space-between",
        "@media screen and (max-width: 480px)": {
          width: "18rem",
        },

        "@media screen and (max-width: 300px)": {
          width: "15rem",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <CardTitle>{name}</CardTitle>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 2 }}>
          <FavBtn
            width={loader ? "" : "2rem"}
            height={loader ? "" : "2rem"}
            onClick={handleFavClick}
          >
            {loader ? (
              <CircularProgress size={32} sx={{ color: "#ffffff" }} />
            ) : favVal ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </FavBtn>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{
          width: "8rem",
          height: "8rem",
          margin: "0 1rem 0 0",
          borderRadius: "0.8rem",
          boxShadow:
            "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        }}
        image={image}
        alt="Live from space album cover"
      />
    </Card>
  );
}

const FavBtn = styled.button`
  border: none;
  background: #2e657e;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  padding: 0.3rem;
  border-radius: 50%;
  svg {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
  }
`;

const CardTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  font-family: Arial;
  height: 4rem;
  display: flex;
  align-items: center;
  @media screen and (max-width: 500px) {
    font-size: 1.2rem;
    height: 3rem;
    word-break: break-all;
  }
`;
