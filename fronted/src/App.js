import GlobalStyle from "./styles/global";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react"; 
import styled from "styled-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import FormFilmes from "./component/Forms/FormFilmes.js";
import GridFilmes from "./component/Grids/GridFilmes";
import FormAtuacao from "./component/Forms/FormAtuacao"; 
import GridAtuacao from "./component/Grids/GridAtuacao"; 
import Form from "./component/Forms/Form";
import Grid from "./component/Grids/Grid";

import TabAtuacoes from "./component/Others/TabAtuacoes";
import Nota from "./component/Others/Nota.js"

import BackToHomeButton from "./component/Buttons/BackToHomeButton";
import ButtonAtores from "./component/Buttons/ButtonAtores";
import ButtonAtuacaoAtor from "./component/Buttons/ButtonAtuacaoAtor";
import ButtonAtuacoes from "./component/Buttons/ButtonAtuacoes.js";
import ButtonFilmes from "./component/Buttons/ButtonFilmes.js";


const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [atores, setAtores] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [filmes, setFilmes] = useState([]); 
  const [atuacoes, setAtuacoes] = useState([]); 

  const getAtores = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/atores");
      const sortedAtores = res.data.sort((a, b) =>
        a.nome.toLowerCase() > b.nome.toLowerCase() ? 1 : -1
      );
      setAtores(sortedAtores);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAtuacoes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/atuacao");
      setAtuacoes(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getFilmes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products"); 
      const sortedFilmes = res.data.sort((a, b) =>
        a.titulo.toLowerCase() > b.titulo.toLowerCase() ? 1 : -1
      );
      setFilmes(sortedFilmes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { 
    getAtores();
    getFilmes();
    getAtuacoes();
  }, []); 

  return (
    <div>
      {window.location.pathname === "/api/products" ? (
        <Container>
          <Title>Filmes</Title>
          <BackToHomeButton />
          <FormFilmes
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getFilmes={getFilmes}
          />
          <GridFilmes
            filmes={filmes}
            setFilmes={setFilmes}
            setOnEdit={setOnEdit}
          />
        </Container>
      ) : window.location.pathname === "/api/atores" ? (
        <Container>
          <Title>Atores</Title>
          <BackToHomeButton />
          <Form
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getAtores={getAtores}
          />
          <Grid atores={atores} setAtores={setAtores} setOnEdit={setOnEdit} />
        </Container>
      ) : window.location.pathname === "/api/atuacao" ? (
        <Container>
          <Title>Atuações</Title>
          <BackToHomeButton />
          <Nota />
          <FormAtuacao 
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getAtuacoes={getAtuacoes}
          />
          <GridAtuacao 
            atuacoes={atuacoes}
            setAtuacoes={setAtuacoes}
            setOnEdit={setOnEdit}
          />
        </Container>
      ) : window.location.pathname === "/api/atuacao/atores-filmes" ? ( 
        <Container>
          <Title>Atuações dos Atores</Title>
          <BackToHomeButton />
          <TabAtuacoes atuacoes={atuacoes} />
        </Container>
      ) : (
        <Container>
  <Title>Bem-vindo! Escolha a operação que desejar!</Title>
  <div>
     <ButtonAtores/>
  </div>
  <div>
      <ButtonFilmes />
  </div>
  <div>
      <ButtonAtuacoes />
  </div>
  <div>
      <ButtonAtuacaoAtor />
  </div>
</Container>
      )}
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </div>
  );
}

export default App;
