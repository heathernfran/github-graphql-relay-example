import React from 'react'
import { Text } from 'react-primitives'
import {createFragmentContainer, graphql} from 'react-relay'

export default createFragmentContainer(
  RepositoryIcon,
  graphql`
    fragment RepositoryIcon_repository on Repository {
      isFork
      isMirror
      isPrivate
    }
  `
)

function RepositoryIcon({repository}) {
  if (repository.isFork) {
    return <Text className="octicon octicon-repo-forked"></Text>
  } else if (repository.isPrivate) {
    return <Text className="octicon octicon-lock"></Text>
  } else if (repository.isMirror) {
    return <Text className="octicon octicon-mirror"></Text>
  } else {
    return <Text className="octicon octicon-repo"></Text>
  }
}
