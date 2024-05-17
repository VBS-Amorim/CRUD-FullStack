import React from "react";
import styled from "styled-components";

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
`;

const BackToHomeButton = () => {
  const handleClick = () => {
    window.location.href = "http://localhost:3001/api";
  };

  return <BackButton onClick={handleClick}>Voltar para Home</BackButton>;
};

export default BackToHomeButton;
