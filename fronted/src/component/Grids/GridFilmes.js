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

const GridFilmes = ({ filmes, setFilmes, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (cod_filme) => {
    await axios
      .delete(`http://localhost:3000/api/products/${cod_filme}`)
      .then(({ data }) => {
        const newArray = filmes.filter((filme) => filme.cod_filme !== cod_filme);
        setFilmes(newArray);
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
          <Th>Título</Th>
          <Th>Ano de Lançamento</Th>
          <Th onlyWeb>Disponível</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {filmes.map((filme, i) => (
          <Tr key={i}>
            <Td width="20%">{filme.cod_filme}</Td>
            <Td width="30%">{filme.titulo}</Td>
            <Td width="30%">{filme.ano_lancamento}</Td>
            <Td width="20%" onlyWeb>{filme.disponivel ? "Sim" : "Não"}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(filme)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(filme.cod_filme)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridFilmes;
