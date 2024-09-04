create database tcc;
use tcc;

create table pins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  type ENUM('mecanico', 'eletricista', 'borracheiro') NOT NULL
);

INSERT INTO pins (latitude, longitude, type) VALUES
(-23.55052, -46.633309, 'mecanico'),
(-23.551, -46.634, 'eletricista'),
(-23.552, -46.635, 'borracheiro'),
(-23.553, -46.636, 'mecanico'),
(-23.554, -46.637, 'eletricista');
