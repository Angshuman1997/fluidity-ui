import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "styled-components";

export default function SkeletonLoader() {
    const bodies = [...Array(50).keys()].map(i => i + 1);
  return (
    <React.Fragment>
      {Object.keys(bodies).map((i, index) => (
        <Loader key={`${i}-${index}`}>
          <Skeleton
            sx={{ bgcolor: "#645e5e" }}
            variant="rounded"
            width={300}
            height={130}
          />
        </Loader>
      ))}
    </React.Fragment>
  );
}

const Loader = styled.div`
    padding: 1rem;
`;
