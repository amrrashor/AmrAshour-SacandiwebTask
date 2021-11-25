import { gql } from "@apollo/client";

export const getCategoriesName = gql`
  {
    categories {
      name
    }
  }
`;
export const getCategories = gql`
  {
    categories {
      name
      products {
        id
        name
        gallery
        inStock
        prices {
          currency
          amount
        }
      }
    }
  }
`;
