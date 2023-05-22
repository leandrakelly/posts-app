import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { schema } from '../Schema';
import playground from 'graphql-playground-middleware-express';
import authValidator from '../Middleware/auth-validator';

export function createTestApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(
    '/graphql',
    authValidator,
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  );

  app.get('/playground', playground({ endpoint: '/graphql' }));

  return app;
}
