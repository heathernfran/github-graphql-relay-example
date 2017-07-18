import React from 'react'
import { View, Text } from 'react-primitives'
import environment from './createRelayEnvironment'
import {commitMutation, createFragmentContainer, graphql} from 'react-relay'

function starMutation(starrableId) {
  const variables = {
    input: {
      starrableId
    },
  }

  commitMutation(environment, {
    variables,
    mutation: graphql`
      mutation RepositoryStarStarMutation($input: AddStarInput!) {
        addStar(input: $input) {
          starrable {
            ...RepositoryStar_repository
          }
        }
      }
    `,
  })
}

function unstarMutation(starrableId) {
  const variables = {
    input: {
      starrableId
    }
  }

  commitMutation(environment, {
    variables,
    mutation: graphql`
      mutation RepositoryStarUnstarMutation($input: RemoveStarInput!) {
        removeStar(input: $input) {
          starrable {
            ...RepositoryStar_repository
          }
        }
      }
    `,
  })
}

export default createFragmentContainer(
  RepositoryStar,
  graphql`
    fragment RepositoryStar_repository on Repository {
      id
      viewerHasStarred
      stargazers {
        totalCount
      }
    }
  `
)

function RepositoryStar({repository}) {
  const octiconClassName = repository.viewerHasStarred ? "octicon octicon-star highlight" : "octicon octicon-star"

  return (
    <Text className="star-badge">
      {repository.stargazers.totalCount}
      <a href="#" onClick={(e) => {
        e.preventDefault()
        repository.viewerHasStarred ? unstarMutation(repository.id) : starMutation(repository.id)
      }}>
        <Text className={octiconClassName}></Text>
      </a>
    </Text>
  )
}
