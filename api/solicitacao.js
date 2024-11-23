const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tcc',
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados');
});

const app = express();
const port = 3003;

app.use(cors());
app.use(bodyParser.json());

// Endpoint para salvar a solicitação
app.post('/solicitacao', (req, res) => {
  const { nome, endereco, telefone, latitude, longitude, id_prestador } = req.body;
  const query = 'INSERT INTO service_requests (nome, endereco, telefone, latitude, longitude, id_prestador) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [nome, endereco, telefone, latitude, longitude, id_prestador], (err, result) => {
    if (err) {
      console.error('Erro ao salvar solicitação:', err);
      return res.status(500).send('Erro ao salvar solicitação');
    }
    res.status(200).send({ id: result.insertId, status: 'pendente' });
  });
});

// Endpoint para listar solicitações pendentes
app.get('/solicitacoes', (req, res) => {
  const query = 'SELECT * FROM service_requests WHERE status = "pendente"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar solicitações:', err);
      return res.status(500).send('Erro ao buscar solicitações');
    }
    res.status(200).json(results);
  });
});

// Endpoint para atualizar o status da solicitação (aceitar ou recusar)
app.put('/solicitacao/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log (id , status);
    const validStatuses = ['aceito', 'recusado'];
  
    if (!validStatuses.includes(status)) {
      return res.status(400).send('Status inválido');
    }
  
    const queryCheckExistence = 'SELECT * FROM service_requests WHERE id = ?';
    db.query(queryCheckExistence, [id], (err, result) => {
      if (err) {
        console.error('Erro ao verificar a solicitação:', err);
        return res.status(500).send('Erro ao verificar solicitação');
      }
  
      if (result.length === 0) {
        return res.status(404).send('Solicitação não encontrada');
      }
  
      const queryUpdate = 'UPDATE service_requests SET status = ? WHERE id = ?';
      db.query(queryUpdate, [status, id], (err, result) => {
        if (err) {
          console.error('Erro ao atualizar status:', err);
          return res.status(500).send('Erro ao atualizar status');
        }
  
        res.status(200).send({ message: 'Status atualizado com sucesso', status });
      });
    });
  });

// Endpoint para obter pinos do tipo 'cliente'
app.get('/usuario/cliente', (req, res) => {
  const tipo = req.query.tipo; // Obtém o valor do tipo (cliente, etc.)

  if (!tipo || !['mecanico', 'borracheiro', 'eletricista', 'cliente'].includes(tipo)) {
    return res.status(400).send('Tipo inválido');
  }

  const query = `
    SELECT id, nome, endereco, telefone, type, latitude, longitude
    FROM usuario
    WHERE type = ?
  `;
  
  db.query(query, [tipo], (err, results) => {
    if (err) {
      console.error('Erro ao buscar pinos de clientes:', err);
      return res.status(500).send('Erro ao buscar pinos de clientes');
    }

    const formattedResults = results.map(user => ({
      id: user.id,
      nome: user.nome,
      endereco: user.endereco,
      telefone: user.telefone,
      type: user.type,
      latitude: parseFloat(user.latitude),
      longitude: parseFloat(user.longitude),
    }));

    res.status(200).json(formattedResults);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  const expressListRoutes = require('express-list-routes');
expressListRoutes(app);
  console.log(`Servidor rodando na porta ${port}`);
});
