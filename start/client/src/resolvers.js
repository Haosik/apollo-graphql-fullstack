import gql from 'graphql-tag';
import { GET_CART_ITEMS } from './pages/cart';

export const schema = gql`
  extend type Launch {
    isInCart: Boolean!
  }
`;

// Extending server's schema with client's "local state"
export const TypeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;

export const resolvers = {
  Launch: {
    isInCart: (launch, _, { cache }) => {
      const { cartItems } = cache.Query({ query: GET_CART_ITEMS });
      return cartItems.includes(launch.id);
    }
  }
};
