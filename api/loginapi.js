const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Certifique-se de que isso está no início do arquivo
const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());

// Mock User Data (replace with your database logic)
const users = [
    { username: 'testuser', senha: 'password123' } // Dados de exemplo
];

// Login Route
app.post('/api/login', (req, res) => {
    const { username, senha } = req.body;

    // Validate the inputs
    if (!username || !senha) {
        return res.status(400).json({ message: 'Insira seu Username e senha .' });
    }

    // Find the user
    const user = users.find(u => u.username === username && u.senha === senha); // Verificação

    if (!user) {
        return res.status(401).json({ message: 'Username e senha inválidos.' });
    }

    // Generate a token
    const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://172.16.11.20:${PORT}`);
});
  