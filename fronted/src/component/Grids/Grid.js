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

export const Thead = styled.thead``;
export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Tbody = styled.tbody``;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Grid = ({ atores, setAtores, setOnEdit }) => {
  const handleEdit = (ator) => {
    setOnEdit(ator);
  };

  const handleDelete = async (cod_ator) => {
    await axios
      .delete(`http://localhost:3000/api/atores/${cod_ator}`)
      .then(({ data }) => {
        const newArray = atores.filter((ator) => ator.cod_ator !== cod_ator);
        setAtores(newArray);
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
          <Th>Nome do ator</Th>
          <Th>Data de nascimento</Th>
          <Th onlyWeb>Nacionalidade</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {atores.map((ator, i) => (
          <Tr key={i}>
            <Td width="20%">{ator.cod_ator}</Td>
            <Td width="30%">{ator.nome}</Td>
            <Td width="30%">{formatDate(ator.data_nascimento)}</Td>
            <Td width="20%" onlyWeb>{ator.nacionalidade}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(ator)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(ator.cod_ator)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
