import React, { useEffect, useRef } from "react";
import styled from "styled-components";
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

const FormFilmes = ({ getFilmes, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const filme = ref.current;

      filme.cod_filme.value = onEdit.cod_filme;
      filme.titulo.value = onEdit.titulo;
      filme.ano_lancamento.value = onEdit.ano_lancamento;
      filme.disponivel.checked = onEdit.disponivel;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filme = ref.current;

    if (
      !filme.cod_filme.value ||
      !filme.titulo.value ||
      !filme.ano_lancamento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const data = {
      cod_filme: filme.cod_filme.value,
      titulo: filme.titulo.value,
      ano_lancamento: filme.ano_lancamento.value,
      disponivel: filme.disponivel.checked,
    };

    if (onEdit) {
      await axios
        .put(`http://localhost:3000/api/products/${onEdit.cod_filme}`, data)
        .then(({ data }) => toast.success(data.message))
        .catch(({ response }) => toast.error(response.data.message));
    } else {
      await axios
        .post("http://localhost:3000/api/products", data)
        .then(({ data }) => toast.success(data.message))
        .catch(({ response }) => toast.error(response.data.message));
    }

    filme.cod_filme.value = "";
    filme.titulo.value = "";
    filme.ano_lancamento.value = "";
    filme.disponivel.checked = false;

    setOnEdit(null);
    getFilmes();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Código do Filme</Label>
        <Input name="cod_filme" />
      </InputArea>
      <InputArea>
        <Label>Título</Label>
        <Input name="titulo" />
      </InputArea>
      <InputArea>
        <Label>Ano de Lançamento</Label>
        <Input name="ano_lancamento" type="number" />
      </InputArea>
      <InputArea>
        <Label>Disponível</Label>
        <Input name="disponivel" type="checkbox" />
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

export default FormFilmes;
