-----------Onklick Solucion a tu alcance--------------
Aplicacion para pymes de servicio tecnico el cual modela las necesidades del clientes trabajando y haciando registros de forma ordenada para asi obtener mayor rentabilidad al facilitar datos.

--------Rubrica-----
1,2,4,5 : API LINEA 16
3: API LINEA 69,85,103
6,7,8,9,10: DURANTE TODO LA APP
11,12: PAGINA PRINCIPAL CARPETA VIEWS Y PUBLIC 

13: ARCHIVO APP Y RUOTES LINEA 1
14: SEPARAMOS LOS METODOS LAS RUTAS Y LAS APP
15,16,17:ARCHIVO ROUTES, API EN SUS RESPECTIVOS LLAMADOS
18,19: CARPETAS DATABASE Y .ENV 
20:PROYECTO LEVANTADO CON API COMPLETA

 -------MySQL --------
 CREATE DATABASE IF NOT EXISTS login_node_jwt;

USE login_node_jwt;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(50),
  name VARCHAR(50),
  pass VARCHAR(50),
  created_at DATE
);

CREATE TABLE IF NOT EXISTS producto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  marca VARCHAR(50),
  modelo VARCHAR(50),
  estado VARCHAR(50),
  fechaEntregaEquipo DATE,
  usuario_id INT,
  FOREIGN KEY (usuario_id) REFERENCES users(id)
);
