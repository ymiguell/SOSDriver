const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002; // Porta para o servidor de perfil

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

// Middleware para parsear JSON
app.use(bodyParser.json());

// Middleware para autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'seu_segredo_jwt', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Rota para obter perfil do usuário
app.post('/api/perfil', (req, res) => {
  //const username = req.user.username; // Extrai o nome de usuário do token decodificado
  const { username, password } = req.body;
  // Encontra o usuário no banco de dados
  const sql = 'SELECT nome , email, telefone, endereco FROM usuario WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Erro ao buscar perfil do usuário:', err);
      return res.status(500).json({ mensagem: 'Erro ao buscar perfil.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    const user = results[0];
    res.json(user);
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor de perfil rodando na porta ${PORT}`);
});
