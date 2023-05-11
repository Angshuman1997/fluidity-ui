import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function ModCard({ image, name }) {
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
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
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
