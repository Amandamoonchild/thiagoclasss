CREATE DATABASE aulabacktds2;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO usuarios (nome, email) VALUES ('manu teste', 'manu@queiros');