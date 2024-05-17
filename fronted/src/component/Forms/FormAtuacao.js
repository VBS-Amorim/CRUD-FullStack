import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

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

const FormAtuacao = ({ onEdit, setOnEdit, getAtuacoes }) => {
  const [codAtuacao, setCodAtuacao] = useState('');
  const [codAtor, setCodAtor] = useState('');
  const [codFilme, setCodFilme] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        cod_atuacao: codAtuacao,
        cod_ator: codAtor,
        cod_filme: codFilme
      };

      if (onEdit) {
        await axios.put(`http://localhost:3000/api/atuacao/${onEdit.cod_atuacao}`, data);
        toast.success('Atuação atualizada com sucesso!');
      } else {
        await axios.post("http://localhost:3000/api/atuacao", data);
        toast.success('Atuação criada com sucesso!');
      }

      setCodAtuacao('');
      setCodAtor('');
      setCodFilme('');

      setOnEdit(null);
      getAtuacoes();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputArea>
        <Label>Código da Atuação:</Label>
        <Input type="text" value={codAtuacao} onChange={(e) => setCodAtuacao(e.target.value)} />
      </InputArea>
      <InputArea>
        <Label>Código do Ator:</Label>
        <Input type="text" value={codAtor} onChange={(e) => setCodAtor(e.target.value)} />
      </InputArea>
      <InputArea>
        <Label>Código do Filme:</Label>
        <Input type="text" value={codFilme} onChange={(e) => setCodFilme(e.target.value)} />
      </InputArea>
      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

export default FormAtuacao;
