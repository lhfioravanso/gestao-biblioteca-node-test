# Gestão Biblioteca Node Test

API Restfull para gestão de livros e usuários de uma biblioteca

## Stack

- NodeJS
- Express
- Sequelize
- PostgreSQL
- Swagger UI
- Mocha
- Chai

## Configuração Banco de Dados

É necessário instalar/possuir um banco de dados PostgreSQL para rodar o projeto.

Os dados de conexão do banco devem ser informados em: /api/config/config.json

Script para criação da base de dev e test, caso necessite:

`````javascript
CREATE DATABASE biblioteca_dev
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE DATABASE biblioteca_test
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
`````

## Rodar a API

Execute os comandos abaixo para rodar a api:

    npm install
    sequelize db:migrate
    sequelize db:seed
    npm start

OBS: ao rodar o comando 'sequelize db:seed' será incluido na base algumas categorias e um usuário padrão para conseguir realizar a primeira autenticação e utilizar as apis que necessitam de autenticação.

Dados do usuário padrão:

    Email: admin
    Password: admin

## Testar a API

Necessário ter configurado a base de test no config.json. 

Execute o comando abaixo para rodar os testes: 

    npm test

## Acessar a API

Após subir o projeto, a api ficará disponivel em:
- http://localhost:3000/api

Para visualizar a documentação da api:
- http://localhost:3000/api-docs



