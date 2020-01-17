const express = require('express');
const helmet = require('helmet');
const projectsRouter = require('./api/routers/projectsRouter');
const actionsRouter = require('./api/routers/actionsRouter');

const server = express();
server.use(helmet('dev'));
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Node API Challenge</h2>`)
});

module.exports = server;