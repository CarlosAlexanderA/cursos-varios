import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
query Repositories {
  repositories {
    edges {
      node {
        id
        ownerName
        name
        createdAt
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        watchersCount
        forksCount
        openIssuesCount
        url
        ownerAvatarUrl
        description
        language
        userHasReviewed
      }
    }
  }
}
`