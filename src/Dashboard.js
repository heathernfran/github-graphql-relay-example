import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-primitives'
import {createPaginationContainer, graphql} from 'react-relay'

import RepositoryListItem from './RepositoryListItem'

class Dashboard extends React.Component {
  render() {
    const {viewer} = this.props.data

    return (
      <View className="repositories">
        <Text>Your repositories</Text>
        <Text className="badge">{viewer.repositories.totalCount}</Text>

        {viewer.repositories.edges.map(edge => (
          <RepositoryListItem repository={edge.node} key={edge.node.id} />
        ))}

        <ShowMore repositories={viewer.repositories} onClick={event => {
          event.preventDefault()
          this.loadMoreRepositories()
        }} />
      </View>
    )
  }

  loadMoreRepositories() {
    this.props.relay.loadMore(10, (err) => {})
  }
}

function ShowMore({repositories, onClick}) {
  if (repositories.pageInfo.hasNextPage) {
    return (
      <Text className="show-more">
        <a href="#" onClick={onClick}>
          Show more repositories...
        </a>

        <span className="octicon octicon-sync spinner"></span>
      </Text>
    )
  } else {
    return <noscript></noscript>
  }
}

export default createPaginationContainer(
  Dashboard,
  graphql`
    fragment Dashboard on Query {
      viewer {
        repositories(first: $count, after: $cursor) @connection(key: "Dashboard_repositories") {
          totalCount

          pageInfo {
            hasNextPage
            endCursor
          }

          edges {
            node {
              id
              ...RepositoryListItem_repository
            }
          }
        }
      }
    }
  `,
  {
    getVariables(props, {count, cursor}, fragmentVariables) {
      return {count, cursor}
    },
    query: graphql`
      query DashboardPaginationQuery($count: Int!, $cursor: String) {
        ...Dashboard
      }
    `
  }
)
