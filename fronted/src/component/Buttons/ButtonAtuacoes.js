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

const AtuacoesButton = () => {
  const handleClick = () => {
    window.location.href = "http://localhost:3001/api/atuacao";
  };

  return (
    <Button onClick={handleClick}>
      Inserção de Atuações
    </Button>
  );
};

export default AtuacoesButton;