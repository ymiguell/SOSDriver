
CREATE database tcc;
USE tcc ;

    
CREATE TABLE  Avaliação (
  pontuacao INT NOT NULL,
  ocorrencia_id VARCHAR(45) NOT NULL,
  PRIMARY KEY (pontuacao)
  );

CREATE TABLE Endereco (
  id int not null auto_increment,
  cep INT NOT NULL,
  numero_casa int not null,
  endereco varchar(100),
  PRIMARY KEY (cep));

CREATE TABLE  Usuario (
  id INT NOT NULL,
  email VARCHAR(45) unique NOT NULL,
  senha VARCHAR(45) NOT NULL,
  telefone varchar(15) not null,
  username varchar(20) not null,
  id_endereco int not null,
  tipo_usuario varchar(20),
  primary key (email),
  FOREIGN KEY (id_endereco) REFERENCES Endereco(id)
	);
    
CREATE TABLE  cliente(
  id int auto_increment,
  nome INT NOT NULL,
  dt_nasc VARCHAR(10) NOT NULL,
  cpf varchar(14) not null,
  primary key (id),
  id_usuario int not null,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
	);
    
CREATE TABLE ocorrencia (
  ocorrencia INT NOT NULL,
  id VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES Endereco(cep)
  lat/long
	);
;
CREATE TABLE  prestadoresServico (
  id int auto_increment,
  nome INT NOT NULL,
  dt_nasc VARCHAR(10) NOT NULL,
  cnpj varchar(14) not null,
  primary key (id),
  id_usuario int not null,
  FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
	);
    
    create table notificacao_user_para_mecanico (
    lat_long varchar(50) not null,
    link_chat varchar(100) not null,
    link_tel varchar (100) not null 
    );
    
    create table pop_mec_para_usuario (
    nome  varchar(15) not null,
    avaliacao varchar(10) not null,
	lat_long varchar(50) not null,
    link_chat varchar(100) not null,
    link_tel varchar (100) not null, 
    foreign key (avaliacao) references avaliacao(pontuacao)
    
    );

select * from cliente_cadastro;

CREATE TABLE pins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL(9, 6) NOT NULL,
  longitude DECIMAL(9, 6) NOT NULL,
  type ENUM('mecanico', 'borracheiro', 'eletricista') NOT NULL
);

INSERT INTO pins (name, latitude, longitude, type) VALUES
('Mecânico do João', -23.550520, -46.633309, 'mecanico'),
('Borracheiro da Maria', -23.556220, -46.634000, 'borracheiro'),
('Eletricista do Carlos', -23.549860, -46.631100, 'eletricista');

