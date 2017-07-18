import React, { Component } from 'react'
import { View, Text } from 'react-primitives'

import {
  QueryRenderer,
  graphql,
} from 'react-relay'

import environment from './createRelayEnvironment'

import Layout from './Layout'
import Dashboard from './Dashboard'

class App extends Component {
  render() {
    const query = graphql`
      query AppQuery($count: Int!, $cursor: String) {
        ...Dashboard
      }
    `

    const variables = {
      count: 10
    }

    return (
      <QueryRenderer environment={environment} query={query} variables={variables} render={RenderApp} />
    )
  }
}

function RenderApp({error, props}) {
  if (error) {
    return <Text>{error.message}</Text>
  } else if (props) {
    return (
      <Layout>
        <Dashboard data={props} />
      </Layout>
    )
  } else {
    return <Text>Loading</Text>
  }
}

export default App
