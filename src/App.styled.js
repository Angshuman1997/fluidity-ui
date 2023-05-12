import { styled } from "styled-components";

export const AppStyle = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  position: fixed;

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transprant;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
