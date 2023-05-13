import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "styled-components";

export default function ModCard({ image, name }) {
  const handleFavClick = (event) => {
    event.stopPropagation();
    console.log("here");
  };

  return (
    <Card
      sx={{
        display: "flex",
        width: "25rem",
        height: "10rem",
        alignItems: "center",
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
          <Typography component="div" variant="h5">
            {name}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 2 }}>
          <FavBtn onClick={handleFavClick}>
            <FavoriteBorderIcon />
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
background: radial-gradient( circle, rgba(12, 4, 24, 1) 64%, rgba(33, 13, 55, 0.9864320728291317) 100% );
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
color: #ffffff;
padding: 0.3rem;
border-radius: 50%;
  svg {
    width: 2rem;
    height: 2rem;
  }
`;
