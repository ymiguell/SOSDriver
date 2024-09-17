
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

CREATE TABLE ocorrencia (
  id int AUTO_INCREMENT NOT NULL,
  ocorrencia INT NOT NULL,
  id_cliente int not null,
  id_prestador int not null,
  latitude DECIMAL(9, 6) NOT NULL,
  longitude DECIMAL(9, 6) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_cliente) REFERENCES usuario(id),
  FOREIGN KEY (id_prestador) REFERENCES usuario(id)
);

CREATE TABLE  avaliacao (
  id int AUTO_INCREMENT NOT NULL,
  pontuacao INT NOT NULL,
  avaliacao varchar(10) not null,
  id_ocorrencia int NOT NULL,
  FOREIGN KEY (id_ocorrencia) REFERENCES ocorrencia(id),
  PRIMARY KEY (id)
);


-- pins -> usuario
INSERT INTO pins (name, latitude, longitude, type) VALUES
('Mecânico do João', -23.550520, -46.633309, 'mecanico'),
('Borracheiro da Maria', -23.556220, -46.634000, 'borracheiro'),
('Eletricista do Carlos', -23.549860, -46.631100, 'eletricista');

select * from cliente_cadastro;

select * 
from prestadoresServico a

