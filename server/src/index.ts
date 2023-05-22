import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { schema } from './Schema';
import playground from 'graphql-playground-middleware-express';
import authValidator from './Middleware/auth-validator';

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

const port = 4000;

if (require.main === module) {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  process.on('SIGINT', () => {
    server.close(() => {
      console.log('Server stopped');
      process.exit(0);
    });
  });
}

export default app;
