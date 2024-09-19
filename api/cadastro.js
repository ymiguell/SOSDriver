const express = require('express'); // Importa o Express
const bcrypt = require('bcrypt'); // Importa o bcrypt para hash de senhas
const mysql = require('mysql'); // Importa o módulo MySQL (ou outro que você estiver usando)
const app = express(); // Inicializa o aplicativo Express

app.use(express.json()); // Permite que o app entenda JSON no corpo das requisições

// Configuração do banco de dados (exemplo)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tcc'
});

// Conecta ao banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados.');
});

app.post('/usuario', async (req, res) => {
  console.log('Recebendo requisição POST em /usuario');
  console.log('Corpo da requisição:', req.body);

  const { nome, dt_nasc, email, username, cpf, senha, confirmsenha, telefone, cep, numero, endereco, latitude, longitude, type } = req.body;

  // Verifica se todos os campos necessários estão presentes
  if (!nome || !dt_nasc || !email || !username || !cpf || !senha || !confirmsenha || !telefone || !cep || !numero || !type) {
    console.log('Campos ausentes:', { nome, dt_nasc, email, username, cpf, senha, confirmsenha, telefone, cep, numero, endereco, latitude, longitude, type });
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
    const sql = `INSERT INTO usuario (nome, dt_nasc, email, username, cpf, senha, telefone, cep, numero, endereco, latitude, longitude, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nome, dt_nasc, email, username, cpf, hashedsenha, telefone, cep, numero, endereco, latitude, longitude, type];

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

// Inicia o servidor na porta desejada
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
