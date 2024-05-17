import React from "react";
import styled from "styled-components";

const InfoBoxContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
  background-color: #cde5ff;
  border-radius: 5px;
  color: #333;
  width: 200px; /* Largura fixa para fazer a caixa ficar quadrada */
`;

const InfoBox = () => {
  return (
    <InfoBoxContainer>
      <p>
        Para atualizar uma atuação, clique no botão de atualização, após isso,
        reescreva os campos que deseja atualizar e clique em Salvar.
      </p>
    </InfoBoxContainer>
  );
};

export default InfoBox;