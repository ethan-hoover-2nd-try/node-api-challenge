const express = require('express');
const helmet = require('helmet');
const projectsRouter = require('./api/routers/projectsRouter');
const actionsRouter = require('./api/routers/actionsRouter');

const server = express();
server.use(helmet('dev'));
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req,res) =>{
    res.status(200).send(`<h1>Node API Challenge Server</h1>`);
});

module.exports = server;