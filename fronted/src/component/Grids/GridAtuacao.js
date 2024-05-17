import React from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 10px #ccc;
  border-radius: 5px;
  max-width: 1220px;
  margin: 20px auto;
  word-break: break-all;
`;

const Thead = styled.thead``;
const Tr = styled.tr``;
const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

const Tbody = styled.tbody``;
const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
`;

const GridAtuacao = ({ atuacoes, setAtuacoes, setOnEdit }) => {
  const handleEdit = (item) => {
    // Aqui você define os valores do item editado nos campos do formulário
    setOnEdit(item);
  };

  const handleDelete = async (cod_atuacao) => {
    await axios
      .delete(`http://localhost:3000/api/atuacao/${cod_atuacao}`)
      .then(({ data }) => {
        const newArray = atuacoes.filter(
          (atuacao) => atuacao.cod_atuacao !== cod_atuacao
        );
        setAtuacoes(newArray);
        toast.success(data.message);
      })
      .catch(({ response }) => toast.error(response.data.message));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Código</Th>
          <Th>Código do Ator</Th>
          <Th>Código do Filme</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {atuacoes.map((atuacao, i) => (
          <Tr key={i}>
            <Td width="20%">{atuacao.cod_atuacao}</Td>
            <Td width="30%">{atuacao.cod_ator}</Td>
            <Td width="30%">{atuacao.cod_filme}</Td>
            <Td alignCenter width="5%">
              {/* Aqui você chama a função handleEdit ao clicar no ícone de editar */}
              <FaEdit onClick={() => handleEdit(atuacao)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(atuacao.cod_atuacao)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridAtuacao;
