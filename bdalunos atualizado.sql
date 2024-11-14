CREATE database tcc;
USE tcc ;

-- cliente_cadastro -> usuario
CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  dt_nasc DATE NOT NULL,
  cpf VARCHAR(14) UNIQUE,
  cnpj VARCHAR(14) UNIQUE,
  telefone varchar(15) not null,
  tipo_usuario varchar(20),
  cep INT NOT NULL,
  numero int not null,
  endereco varchar(100),
  latitude DECIMAL(9, 6),
  longitude DECIMAL(9, 6),
  type ENUM('mecanico', 'borracheiro', 'eletricista', 'cliente') NOT NULL
);
CREATE TABLE service_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  status ENUM('pendente', 'aceito', 'recusado') DEFAULT 'pendente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from service_requests;
select * from usuario;

ALTER TABLE service_requests ADD COLUMN latitude DECIMAL(9, 6);
ALTER TABLE service_requests ADD COLUMN longitude DECIMAL(9, 6);
TRUNCATE TABLE service_requests;
ALTER TABLE service_requests AUTO_INCREMENT = 1;