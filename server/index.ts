import compress from '@fastify/compress';
import middie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import fastify from 'fastify';
import path from 'path';
import vite from 'vite';
import { renderPage } from 'vite-plugin-ssr/server';
import { env } from "./env";
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { appRouter } from './router';
import { createContext } from 'react';
import prismaPlugin from '../utils/prisma';

const isProduction = process.env.NODE_ENV === 'production';
const root = `${__dirname}/..`;

startServer();

async function startServer() {
  console.log("Server starting... ⏳");
  const app = fastify({
    maxParamLength: 5000
  });

  await app.register(prismaPlugin);

  app.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router: appRouter, createContext },
  });

  await app.register(middie);
  await app.register(compress);

  if (isProduction) {
    console.log("Production mode.");
    const distPath = path.join(root, '/dist/client/assets');
    app.register(fastifyStatic, {
      root: distPath,
      prefix: '/assets/'
    });
  } else {
    console.log("Development mode.");
    const viteServer = await vite.createServer({
      root,
      server: { middlewareMode: true }
    });
    await app.use(viteServer.middlewares);
  }

  app.get('*', async (req, reply) => {
    
    const pageContextInit = {
      urlOriginal: req.url
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;

    if (!httpResponse) {
      return reply.code(404).type('text/html').send('Not Found');
    }

    const { body, statusCode, contentType } = httpResponse;

    return reply.status(statusCode).type(contentType).send(body);
  })
  const host: string = env.HOST ?? "localhost";
  const port: number = env.PORT ?? 3000;

  app.listen({ host, port });

  console.log(`Server running at: 🕸  http://${host}:${port} 🕸`);
}