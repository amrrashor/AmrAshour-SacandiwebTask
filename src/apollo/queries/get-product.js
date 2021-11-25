import { gql } from "@apollo/client";

export const getProduct = gql`
  query getProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      prices {
        currency
        amount
      }
    }
  }
`;
