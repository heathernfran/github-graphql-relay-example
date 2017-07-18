import React from 'react'
import { View } from 'react-primitives'
import {createFragmentContainer, graphql} from 'react-relay'

import RepositoryIcon from './RepositoryIcon'
import RepositoryStar from './RepositoryStar'

export default createFragmentContainer(
  RepositoryListItem,
  graphql`
    fragment RepositoryListItem_repository on Repository {
      name
      owner {
        login
      }

      url

      ...RepositoryIcon_repository
      ...RepositoryStar_repository
    }
  `
)

function RepositoryListItem({repository}) {
  return (
    <View className="list-group-item">
      <RepositoryStar repository={repository} />
      <RepositoryIcon repository={repository} />

      <a href={repository.url}>
        {repository.owner.login}/{repository.name}
      </a>
    </View>
  )
}
