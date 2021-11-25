import { gql } from "@apollo/client";

export const getCategoryByName = gql`
  query getCategoryByName($id: String!) {
    category(input: { title: $id }) {
      name
      products {
        id
        name
        inStock
        gallery
        category
        prices {
          currency
          amount
        }
      }
    }
  }
`;
