import React from "react";
import styled from "styled-components";

const Button = styled.button`
  margin-top: 80px;
  margin-bottom: 10px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  font-size: 16px;
`;

const AtoresButton = () => {
  const handleClick = () => {
    window.location.href = "http://localhost:3001/api/atores";
  };

  return (
    <Button onClick={handleClick}>
      Atores
    </Button>
  );
};

export default AtoresButton;
