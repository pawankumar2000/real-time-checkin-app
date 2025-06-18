import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.on('joinEvent', (data) => {
    io.emit('userJoined', data);
  });
});

const server = new ApolloServer({
  typeDefs,
  resolvers: { 
    ...resolvers, 
    Context: () => ({ prisma }) 
  },
});
async function start() {
  await server.start();
  server.applyMiddleware({ app });
  httpServer.listen(4000, () => console.log("🚀 Backend running on http://localhost:4000/graphql"));
}
start();

