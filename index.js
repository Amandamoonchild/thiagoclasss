const express = require('express');
const { emit } = require('nodemon');
const { Pool } = require('pg')

const app = express();
const port = 4000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'aulabacktds2',
    password: 'ds564',
    port: '5432',
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando 🎀')
});

app.get('/usuarios', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios');
        res.json({
            total: resultado.rowCount,
            usuarios: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter todos os usuários 😲');
        res.status(500).send({mensagem: 'Erro ao obter todos os usuários 😲'})
    }
})

app.post('/usuarios', async(req, res) => {
    try {
        const {nome, email} = req.body;
        await pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2)', [nome, email])
        res.status(201).send({mensagem: 'Sucesso ao criar usuario 😎'})
    } catch (error) {
        console.error('Erro ao criar o usuario 😲');
        res.status(500).send({mensagem: 'Erro ao criar o usuario 😲'})
    }
})

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'Sucesso ao deletar usuario 😎'})
    } catch (error) {
        console.error('Erro ao deletar o usuario 😲');
        res.status(500).send({mensagem: 'Erro ao deletar o usuario 😲'})
    }
})

app.put('/usuarios/id', async(req, res) =>{
    try {
        const {id} = req.params;
        const {nome, email} = req.body;
        await pool.query('UPDATE usuarios SET nome = $1, email = $2, id = $3', [nome, id, email]);
        res.status(200).send({mensagem: 'Sucesso ao editar usuario 😎'})
    } catch (error) {
        console.error('Erro ao editar o usuario 😲');
        res.status(500).send({mensagem: 'Erro ao editar o usuario 😲'})
    }
})

app.get('/usuarios/id', async(req, res) =>{
    try {
        const {id} = req.params;
        const {nome, email} = req.body;
        await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        res.status(200).send({mensagem: 'Sucesso ao selecionar usuario 😎'})
    } catch (error) {
        console.error('Erro ao selecionar o usuario 😲');
        res.status(404).send({mensagem: 'Erro ao selecionar o usuario 😲'})
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} 🍄`)
});