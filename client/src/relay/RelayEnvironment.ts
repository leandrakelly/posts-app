import {
  Environment,
  Network,
  RecordSource,
  Store,
  RequestParameters,
  Variables,
} from 'relay-runtime';

const { REACT_APP_GRAPHQL_ENDPOINT } = process.env;

const fetchQuery = async (request: RequestParameters, variables: Variables) => {
  const token = localStorage.getItem('token');

  const response = await fetch(REACT_APP_GRAPHQL_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  return response.json();
};

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export { environment as RelayEnvironment };
