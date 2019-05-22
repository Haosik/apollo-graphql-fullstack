import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';

import Pages from './pages';

const cache = new InMemoryCache();
// const link = new HttpLink({
//   uri: 'https://server-adl1f8gwo.now.sh/'
// });
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'https://server-adl1f8gwo.now.sh/',
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: []
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById('root')
);
