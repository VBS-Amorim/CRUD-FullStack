
//Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Product'

const router = require('express-promise-router')();
const productController = require('../controllers/product.controller');

//Rotas - Filmes
//Rotas - Filmes
//Rotas - Filmes
//Rotas - Filmes

//Rota responsável por criar um novo filme (POST); localhost:3000/api/products
router.post('/products', productController.createProduct);
module.exports = router;

//Rota responsável por listar todos os filmes (GET); localhost:3000/api/products
router.get('/products', productController.listAllProducts);

//Rota responsável por selecionar filmes pelo 'cod_filme' (GET); localhost:3000/api/products/:id
router.get('/products/:id', productController.findProductById);

//Rota responsável por atualizar filmes pelo 'cod_filme' (PUT); localhost: 3000/api/products/:id
router.put('/products/:id', productController.updateProductById);

//Rota responsável por excluir um filme pelo 'cod_filme' (DELETE); localhost:3000/api/products/:id
router.delete('/products/:id', productController.deleteProductById);


//Rotas - Atores
//Rotas - Atores
//Rotas - Atores
//Rotas - Atores

// Rota responsável por criar um novo Ator (POST); localhost:3000/api/
router.post('/atores', productController.createAtores);
module.exports = router;

//Rota responsável por listar todos os atores (GET); localhost:3000/api/atores
router.get('/atores', productController.listAllAtores);

//Rota responsável por selecionar filmes pelo 'cod_filme' (GET); localhost:3000/api/atores/:id
router.get('/atores/:id', productController.findAtoresById);

//Rota responsável por atualizar atores pelo 'cod_ator' (PUT); localhost: 3000/api/atores/:id
router.put('/atores/:id', productController.updateAtoresById);

//Rota responsável por excluir um ator pelo 'cod_ator' (DELETE); localhost:3000/api/atores/:id
router.delete('/atores/:id', productController.deleteAtoresById);

//Rotas - Atuação
//Rotas - Atuação
//Rotas - Atuação
//Rotas - Atuação

router.get('/atuacao/atores-filmes', productController.listAtoresFilmes);

// Rota responsável por criar uma nova Atuacao (POST); localhost:3000/api/atuacao
router.post('/atuacao', productController.createAtuacao);
module.exports = router;

//Rota responsável por listar todos as atuacoes (GET); localhost:3000/api/atuacao
router.get('/atuacao', productController.listAllAtuacoes);

//Rota responsável por selecionar uma atuacao pelo 'cod_ator' (GET); localhost:3000/api/atuacao/:id
router.get('/atuacao/:id', productController.findAtuacaoById);

//Rota responsável por atualizar atuacao (PUT); localhost: 3000/api/atuacao/:id 
router.put('/atuacao/:id', productController.updateAtuacaoById);

//Rota responsável por excluir uma atuacao  (DELETE); localhost:3000/api/products/:id
router.delete('/atuacao/:id', productController.deleteAtuacaoById);



//Rota responsável por listar os atores e filmes de uma atuacao (GET); localhost:3000/api/products/:id
// router.get('/atuacao/atores-filmes', productController.listAtoresFilmes);

module.exports = router;