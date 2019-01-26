import styled from "styled-components";
import { Search } from "styled-icons/boxicons-regular/Search";

const serachBoxColor = "#008c9e";

export const SearchIcon = styled(Search)`
  color: white;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 2em;
  display: flex;
  justify-content: center;
  align-self: center;
  margin: 1em 0px 2em -5px;
`;

export const Input = styled.input`
  width: 80%;
  border: 5px solid ${serachBoxColor};
  padding: 5px;
  height: 20px;
  border-radius: 5px;
  outline: none;
  color: #9dbfaf;

  &:focus {
    color: ${serachBoxColor};
  }
`;

export const Button = styled.button`
  position: relative;
  background-color: ${serachBoxColor};
  outline: none;
  border: none;
  height: 3em;
  right: 5px;
  width: 3em;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
`;
