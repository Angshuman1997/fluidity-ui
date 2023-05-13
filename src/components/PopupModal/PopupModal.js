import * as React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notificationFunc } from "../../redux/actions/actions";

export default function PopupModal({ open, handleClose, popupContentId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [content, setContent] = React.useState(null);

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
          navigate("/login");
        } else {
          setContent(JSON.parse(response.data.data));
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

  React.useEffect(() => {
    getOneData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <CloseBtnSection>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </CloseBtnSection>
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
const CloseBtnSection = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 0.5rem 1rem 0;
  button {
    cursor: pointer;
    border: none;
    background: #000000;
    padding: 0.5rem;
    color: #ffffff;
    border-radius: 50%;
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
