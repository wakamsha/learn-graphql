import { graphql } from '../generated';

export const User = graphql(`
  query user {
    user(id: "a") {
      id,
      name
    }
  }
`);
