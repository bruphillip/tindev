import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import io from 'socket.io';
import { Server } from 'http';

import routes from './routes';
class App {
  constructor() {
    this.server = express();
    this.httpServer = new Server(this.server);
    this.io = io(this.httpServer);
    this.socket();
    this.database();
    this.init();
  }

  socket() {
    this.connectedUsers = {};
    this.io.on('connection', socket => {
      const { user } = socket.handshake.query;

      this.connectedUsers[user] = socket.id;

      console.log(this.connectedUsers[user]);
    });

    this.server.use((req,res,next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;
      return next();
    });
  }

  init() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(routes);
  }

  database() {
    mongoose.connect('mongodb://localhost:27017/tindev', {
      useNewUrlParser: true
    });
  }
}

new App().httpServer.listen(3333);