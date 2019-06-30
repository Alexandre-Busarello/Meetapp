import express from 'express';

const server = express();

server.use(express.json());

server.listen(4444);
