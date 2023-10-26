const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use a porta 3000, a menos que a variável de ambiente PORT esteja definida

// Configuração do Swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swagger/swaggerDefinition'); // Certifique-se de que o caminho está correto

// Definir a documentação Swagger
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Certifique-se de que seus arquivos de rota estejam no diretório correto
};
const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Alunos da Escola!');
});

// Rota para a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota de alunos
const alunosRouter = require('./routes/alunos');
app.use('/alunos', alunosRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
