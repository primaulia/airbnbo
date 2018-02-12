import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// This packages is for ws connection
import { ApolloLink, split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

// this is the link to connect to ur graphql server (HTTP only!)
const httpLink = new HttpLink({ uri: 'http://localhost:4000' }) // TODO: update this to process.env

// create one more link for WS
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000',
  options: {
    reconnect: true
  }
})

const splitFn = ({query}) => {
  const { kind, operation } = getMainDefinition(query)
  return kind === 'OperationDefinition' && operation === 'subscription'
}

// split the method according to the request ( type of operation )
const link = split(
  splitFn,
  wsLink,
  httpLink
)

// this is the object that helps to run the graphql query
// or mutation for you
const caller = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

// ApolloProvider provides graphql conn to our main component
ReactDOM.render(
  <ApolloProvider client={caller}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
