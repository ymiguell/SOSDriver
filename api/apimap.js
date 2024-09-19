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
app.get('/usuario', (req, res) => {
  const type = req.query.type;

  // Cria uma lista de tipos válidos
  const validTypes = ['mecanico', 'borracheiro', 'eletricista'];

  // Verifica se o tipo fornecido é válido
  if (type && !validTypes.includes(type)) {
    return res.status(400).json({ message: 'Tipo inválido.' });
  }

  // Monta a consulta SQL
  let query = `
    SELECT id, endereco, telefone, tipo_usuario, latitude, longitude
    FROM usuario 
    WHERE type != 'cliente'
  `;
  if (type) {
    query += ' AND type = ?';
  }

  // Executa a consulta
  connection.query(query, [type].filter(Boolean), (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ message: 'Erro ao buscar dados', error: err.message });
    } else {
      // Formata a resposta para incluir apenas os dados necessários
      const formattedResults = results.map(user => ({
        id: user.id,
        nome: user.nome,
        endereco: user.endereco,
        telefone: user.telefone,
        type: user.tipo_usuario,
        latitude: parseFloat(user.latitude),
        longitude: parseFloat(user.longitude),
       
      }));
      res.json(formattedResults);
    }
  });
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
