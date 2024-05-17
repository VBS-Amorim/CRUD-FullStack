import React from "react";
import styled from "styled-components";

const Button = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  font-size: 16px;
`;

const AtuacaoDosAtoresButton = () => {
  const handleClick = () => {
    window.location.href = "http://localhost:3001/api/atuacao/atores-filmes";
  };

  return (
    <Button onClick={handleClick}>
      Elenco dos filmes
    </Button>
  );
};

export default AtuacaoDosAtoresButton;