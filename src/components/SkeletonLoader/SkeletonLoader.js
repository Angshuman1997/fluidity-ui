import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "styled-components";

export default function SkeletonLoader() {
    const bodies = [...Array(6).keys()].map(i => i + 1);
  return (
    <React.Fragment>
      {Object.keys(bodies).map((i, index) => (
        <Loader key={`${i}-${index}`}>
          <Skeleton
            sx={{ 
              bgcolor: "#578aa1",
              width: "25rem",
              height: "10rem",
              
              "@media screen and (max-width: 480px)": {
                width: "18rem",
              },

              "@media screen and (max-width: 300px)": {
                width: "15rem",
              },
            }}
            variant="rounded"
          />
        </Loader>
      ))}
    </React.Fragment>
  );
}

const Loader = styled.div`
    padding: 1rem;
`;
