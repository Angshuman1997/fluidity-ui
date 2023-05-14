import { styled } from "styled-components";

export const AppStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  position: fixed;
  background: radial-gradient( circle, rgb(46 101 126) 64%, rgb(65 64 74 / 99%) 100% );

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
