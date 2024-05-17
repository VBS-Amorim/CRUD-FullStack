import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getAtores, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.cod_ator.value = onEdit.cod_ator;
      user.nome.value = onEdit.nome;
      user.data_nascimento.value = formatDate(onEdit.data_nascimento);
      user.nacionalidade.value = onEdit.nacionalidade;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.cod_ator.value ||
      !user.nome.value ||
      !user.data_nascimento.value ||
      !user.nacionalidade.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const data = {
      cod_ator: user.cod_ator.value,
      nome: user.nome.value,
      data_nascimento: user.data_nascimento.value,
      nacionalidade: user.nacionalidade.value,
    };

    if (onEdit) {
      await axios
        .put(`http://localhost:3000/api/atores/${onEdit.cod_ator}`, data)
        .then(({ data }) => toast.success(data.message))
        .catch(({ response }) => toast.error(response.data.message));
    } else {
      await axios
        .post("http://localhost:3000/api/atores", data)
        .then(({ data }) => toast.success(data.message))
        .catch(({ response }) => toast.error(response.data.message));
    }

    user.cod_ator.value = "";
    user.nome.value = "";
    user.data_nascimento.value = "";
    user.nacionalidade.value = "";

    setOnEdit(null);
    getAtores();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Código do Ator</Label>
        <Input name="cod_ator" />
      </InputArea>
      <InputArea>
        <Label>Nome do Ator</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Data de nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>
      <InputArea>
        <Label>Nacionalidade do Ator</Label>
        <Input name="nacionalidade" />
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

export default Form;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
