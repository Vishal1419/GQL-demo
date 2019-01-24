import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './assets/styles/app.scss';
import Routes from './Routes';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Routes />
    </div>
  </ApolloProvider>
);

export default App;
