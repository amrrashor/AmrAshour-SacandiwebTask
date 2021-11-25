import { gql } from "@apollo/client";

export const getCurrencies = gql`
  {
    currencies
  }
`;
