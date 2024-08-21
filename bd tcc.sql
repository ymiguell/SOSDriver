
CREATE database tcc;
USE tcc ;

CREATE TABLE  Avaliação (
  pontuacao INT NOT NULL,
  ocorrencia_id VARCHAR(45) NOT NULL,
  PRIMARY KEY (pontuacao)
  );

CREATE TABLE Endereco (
  cep INT NOT NULL,
  endereco varchar(100),
  PRIMARY KEY (cep));

CREATE TABLE  Usuario (
  id INT NOT NULL,
  email VARCHAR(45) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  telefone varchar(15) not null,
  FOREIGN KEY (duvida_doq_vai_aqui) REFERENCES Endereco(cep)
	);
    
CREATE TABLE  cliente_cadastro (
  id int auto_increment,
  nome INT NOT NULL,
  dt_nasc VARCHAR(10) NOT NULL,
  email varchar(20) not null,
  username varchar(20) not null,
  cpf varchar(14) not null,
  senha varchar(15)not null,
  rept_senha varchar(15)not null,
  primary key (id)
  
	);
    FOREIGN KEY (duvida_doq_vai_aqui) REFERENCES Endereco(cep)
CREATE TABLE ocorrencia (
  ocorrencia INT NOT NULL,
  id VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES Endereco(cep)
	);
;
CREATE TABLE  prestadoresServico (
  nome INT NOT NULL,
  dt_nasc VARCHAR(10) NOT NULL,
  email varchar(20) not null,
  usernome varchar(20) not null,
  cnpj varchar(14) not null,
  senha varchar(15)not null,
  confirmsenha varchar(15)not null,
  primary key (cpf),
  FOREIGN KEY (duvida_doq_vai_aqui) REFERENCES Endereco(cep)
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