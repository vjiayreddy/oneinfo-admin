import { gql } from "@apollo/client";

// Example queries - Replace with your actual GraphQL schema

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      createdAt
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      createdAt
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($limit: Int, $offset: Int) {
    posts(limit: $limit, offset: $offset) {
      id
      title
      content
      author {
        id
        name
      }
      createdAt
    }
  }
`;

export const SEARCH_CONTENT = gql`
  query SearchContent($query: String!) {
    search(query: $query) {
      id
      title
      type
      createdAt
    }
  }
`;

export const GET_ALL_CREATORS = gql`
  query GetAllCreators($page: Int, $limit: Int, $filters: CreatorFilter) {
    getAllCreators(page: $page, limit: $limit, filters: $filters) {
      totalCount
      data {
        _id
        bio
        consultationLink
        contentCategories {
          contentCategoryId
          contentCategoryName
        }
        webhooksEnable
        profilePic
        profileUrl
        name
        instagramUserId
        isBlocked
        followersCount
        followStatusCheck
        firebaseToken
        enableDmAutomation
        deleteDate
        countryCode
      }
    }
  }
`;
