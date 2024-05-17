import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TabAtuacoes = () => {
  const [atuacoes, setAtuacoes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/atuacao/atores-filmes')
      .then(response => {
        setAtuacoes(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter as atuações dos atores:', error);
      });
  }, []);

  return (
    <div>
      <h2>Atuações dos Atores</h2>
      <table>
        <thead>
          <tr>
            <th>Código de Atuação</th>
            <th>Nome do Ator</th>
            <th>Filme</th>
          </tr>
        </thead>
        <tbody>
          {atuacoes.map(atuacao => (
            <tr key={atuacao.cod_atuacao}>
              <td>{atuacao.cod_atuacao}</td>
              <td>{atuacao.nome_ator}</td>
              <td>{atuacao.titulo_filme}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabAtuacoes;
