import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider, Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import { resolvers, TypeDefs } from './resolvers';

import Pages from './pages';
import Login from './pages/login';
import injectStyles from './styles';

// Local state query with @client
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'https://server-adl1f8gwo.now.sh/',
    headers: {
      authorization: localStorage.getItem('token')
    }
  }),
  TypeDefs,
  resolvers
});

// Default local state's data (initialState)
cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: []
  }
});

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={IS_LOGGED_IN}>{({ data }) => (data.isLoggedIn ? <Pages /> : <Login />)}</Query>
  </ApolloProvider>,
  document.getElementById('root')
);
