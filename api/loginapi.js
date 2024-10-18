const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

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

// Middleware
app.use(bodyParser.json());

// Rota de Login
app.post('/api/login', (req, res) => {
    const { username, senha } = req.body;

    // Valida os campos
    if (!username || !senha) {
        return res.status(400).json({ mensagem: 'Insira seu Username e senha.' });
    }

    // Encontra o usuário no banco de dados
    const sql = 'SELECT * FROM usuario WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ mensagem: 'Erro ao realizar o login.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ mensagem: 'Username ou senha inválidos.' });
        }

        const usuario = results[0];
        console.log("Usuário:", usuario); // Verifique aqui

        // Verifica a senha
        bcrypt.compare(senha, usuario.senha, (err, resultado) => {
            if (err || !resultado) {
                return res.status(401).json({ mensagem: 'Username ou senha inválidos.' });
            }

            // Gera um token
            const token = jwt.sign({ username: usuario.username }, 'seu_segredo_jwt', { expiresIn: '1h' });

            console.log("Tipo do usuáriooo:", usuario.type);

            // Inclui o tipo de usuário na resposta
            res.json({ 
                token,
                nome: usuario.nome,
                tipo: usuario.type // Aqui deve ser usuario.type
            });
        });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
