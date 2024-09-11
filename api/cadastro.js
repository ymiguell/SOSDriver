const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tcc'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados.');
});

// Endpoint para cadastro de usuário
app.post('/cliente_cadastro', async (req, res) => {
  console.log('Recebendo requisição POST em /cliente_cadastro');
  console.log('Corpo da requisição:', req.body);

  const { nome, dt_nasc, email, username, cpf, senha, confirmsenha } = req.body;

  // Verifica se todos os campos necessários estão presentes
  if (!nome || !dt_nasc || !email || !username || !cpf || !senha || !confirmsenha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  // Verifica se as senhas coincidem
  if (senha !== confirmsenha) {
    return res.status(400).json({ message: 'As senhas não coincidem.' });
  }

  try {
    // Hash da senha
    const hashedsenha = await bcrypt.hash(senha, 10);

    // Insere o novo usuário no banco de dados
    const sql = `INSERT INTO cliente_cadastro (nome, dt_nasc, email, username, cpf, senha) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [nome, dt_nasc, email, username, cpf, hashedsenha];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Erro ao inserir dados:', err);
        return res.status(500).json({ message: 'Erro ao realizar o cadastro.' });
      }

      res.status(200).json({ message: 'Cadastro realizado com sucesso.' });
    });
  } catch (error) {
    console.error('Erro ao hashear a senha:', error);
    res.status(500).json({ message: 'Erro ao realizar o cadastro.' });
  }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});