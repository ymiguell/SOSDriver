// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3005;

// Middleware
app.use(express.json());
app.use(cors());

// Configuração da conexão MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // substitua pela sua senha do MySQL
  database: 'tcc',
});

// Conectar ao banco de dados MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Rota para obter pinos
app.get('/pins', (req, res) => {
  const type = req.query.type;

  let query = "SELECT * FROM pins where type != 'cliente'";
  if (type) {
    query += ' and type = ?';
  }

  connection.query(query, [type], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching pins', error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});