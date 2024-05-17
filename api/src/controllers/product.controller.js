const db = require("../config/database");

// CRUD - Filmes
// CRUD - Filmes
// CRUD - Filmes
// CRUD - Filmes


//Método responsável por criar um novo filme

exports.createProduct = async (req, res) => {
  const { cod_filme, titulo, ano_lancamento, disponivel } = req.body;
  const { rows } = await db.query(
    "INSERT INTO filmes (cod_filme, titulo, ano_lancamento, disponivel) VALUES ($1, $2, $3, $4) RETURNING *",
    [cod_filme, titulo, ano_lancamento, disponivel]
  );
  res.status(201).send({
    message: "Filme adicionado com sucesso!",
    body: {
      product: { cod_filme, titulo, ano_lancamento, disponivel }
    },
  });
};

// Método responsável por listar todos os filmes

exports.listAllProducts = async (req, res) => {
  const response = await db.query('SELECT * FROM filmes ORDER BY titulo ASC');
  res.status(200).send(response.rows);
};

// Método responsável por selecionar filmes pelo 'cod_filme'

exports.findProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM filmes WHERE cod_filme = $1', [productId]);
  res.status(200).send(response.rows);
}

//Método responsável por atualizar um filme pelo 'cod_filme'

exports.updateProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const {cod_filme, titulo, ano_lancamento, disponivel } = req.body;
  const response = await db.query(
    "UPDATE filmes SET titulo = $1, ano_lancamento = $2, disponivel = $3 WHERE cod_filme = $4",
    [titulo, ano_lancamento, disponivel, cod_filme,]
  );
  res.status(200).send({ message: "Filme Updated Successfully!" });
};

//Método responsável por excluir um filme pelo 'cod_filme'

exports.deleteProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await db.query('DELETE FROM filmes WHERE cod_filme = $1', [
    productId
  ]);
  res.status(200).send({ message: 'Filme deleted successfully!', productId });
};

// CRUD - Atores
// CRUD - Atores
// CRUD - Atores
// CRUD - Atores

//Método responsável por criar um novo ator

exports.createAtores = async (req, res) => {
  const { cod_ator, nome, data_nascimento, nacionalidade } = req.body;
  const { rows } = await db.query(
    "INSERT INTO atores (cod_ator, nome, data_nascimento, nacionalidade) VALUES ($1, $2, $3, $4) RETURNING *",
    [cod_ator, nome, data_nascimento, nacionalidade]
  );
  res.status(201).send({
    message: "Ator adicionado com sucesso!",
    body: {
      product: { cod_ator, nome, data_nascimento, nacionalidade }
    },
  });
};

// Método responsável por listar todos os filmes

exports.listAllAtores = async (req, res) => {
  const response = await db.query('SELECT * FROM atores ORDER BY nome ASC');
  res.status(200).send(response.rows);
};

// Método responsável por selecionar atores pelo 'cod_ator'

exports.findAtoresById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM atores WHERE cod_ator = $1', [productId]);
  res.status(200).send(response.rows);
}

//Método responsável por atualizar um ator pelo 'cod_ator'

exports.updateAtoresById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const {cod_ator, nome, data_nascimento, nacionalidade } = req.body;
  const response = await db.query(
    "UPDATE atores SET nome = $1, data_nascimento = $2, nacionalidade = $3 WHERE cod_ator = $4",
    [nome, data_nascimento, nacionalidade, cod_ator,]
  );
  res.status(200).send({ message: "Ator Updated Successfully!" });
};

//Método responsável por excluir um ator pelo 'cod_ator'

exports.deleteAtoresById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await db.query('DELETE FROM atores WHERE cod_ator= $1', [
    productId
  ]);
  res.status(200).send({ message: 'Ator deleted successfully!', productId });
};

// CRUD - Atuação
// CRUD - Atuação
// CRUD - Atuação
// CRUD - Atuação

//Método responsável por criar uma nova atuacao

exports.createAtuacao = async (req, res) => {
  const { cod_atuacao, cod_ator, cod_filme } = req.body;
  const { rows } = await db.query(
    "INSERT INTO atuacao (cod_atuacao, cod_ator, cod_filme) VALUES ($1, $2, $3) RETURNING *",
    [cod_atuacao, cod_ator, cod_filme]
  );
  res.status(201).send({
    message: "Ator adicionado com sucesso!",
    body: {
      product: { cod_atuacao, cod_ator, cod_filme }
    },
  });
};

// Método responsável por listar todas as atucoes

exports.listAllAtuacoes = async (req, res) => {
  const response = await db.query('SELECT * FROM atuacao');
  res.status(200).send(response.rows);
};

// Método responsável por selecionar atucao pelo 'cod_atuacao'

exports.findAtuacaoById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM atuacao WHERE cod_atuacao = $1', [productId]);
  res.status(200).send(response.rows);
}

//Método responsável por atualizar uma atuacao pelo 'cod_atuacao'

exports.updateAtuacaoById = async (req, res) => {
  const cod_atuacao = parseInt(req.params.id);
  const { cod_ator, cod_filme } = req.body;
  const response = await db.query(
    "UPDATE atuacao SET cod_ator = $1, cod_filme = $2 WHERE cod_atuacao = $3",
    [cod_ator, cod_filme, cod_atuacao]
  );
  res.status(200).send({ message: "Atuacao Updated Successfully!" });
};

//Método responsável por excluir uma atuacao por 'cod_atuacao'

exports.deleteAtuacaoById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await db.query('DELETE FROM atuacao WHERE cod_atuacao = $1', [
    productId
  ]);
  res.status(200).send({ message: 'Atuacao deleted successfully!', productId });
};


//Método responável por listar as atuações

exports.listAtoresFilmes = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT atu.cod_atuacao, a.nome AS nome_ator, p.titulo AS titulo_filme
      FROM atuacao atu
      INNER JOIN atores a ON atu.cod_ator = a.cod_ator
      INNER JOIN filmes p ON atu.cod_filme = p.cod_filme;`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
