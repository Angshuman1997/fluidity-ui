import React from "react";
import { styled } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

const SearchBar = ({
  serVal,
  handleChange,
  handlePress,
  handleClick,
  enableSer,
  handleSerRemove,
}) => {
  return (
    <Content>
      <InnerContent>
        <input
          type="text"
          placeholder="Search"
          value={serVal}
          onChange={handleChange}
          onKeyDown={handlePress}
        />
        <SearchBtn onClick={handleClick}>
          <SearchIcon />
        </SearchBtn>
        <RemoveSearch
          onClick={handleSerRemove}
          disabled={!enableSer}
          style={{ cursor: enableSer ? "pointer" : "not-allowed" }}
        >
          <CancelIcon />
        </RemoveSearch>
      </InnerContent>
    </Content>
  );
};

export default SearchBar;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  margin: 0 2rem;
  border-radius: 1.5rem;
`;

const InnerContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0;
  input {
    width: 90%;
    margin-left: 0.8rem;
    font-size: 1rem;
    border: none;
    font-family: inherit;
    font-weight: 500;
    display: flex;
    align-items: center;
    outline: none;
  }
`;

const SearchBtn = styled.button`
  border: none;
  background: transparent;
  margin-right: 0.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RemoveSearch = styled.button`
  border: none;
  background: transparent;
  margin-right: 0.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover:after {
    content: "Fetch All Data";
    font-family: Arial;
    position: absolute;
    top: 3rem;
    width: 5rem;
    height: 2rem;
    background-color: gray;
    color: white;
    padding: 0.2rem;
    border-radius: 0.5rem;
    font-weight: 600;
  }
`;
