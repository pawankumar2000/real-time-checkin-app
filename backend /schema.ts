import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  model User { id: ID!, name: String!, email: String! }
  model Event { id: ID!, name: String!, location: String!, startTime: String!, attendees: [User!]! }

  type Query {
    getEvents: [Event!]!
    getMe: User
  }
  type Mutation {
    joinEvent(eventId: ID!): Event!
  }
`;
