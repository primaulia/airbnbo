import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// this is the link to connect to ur graphql server
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

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
