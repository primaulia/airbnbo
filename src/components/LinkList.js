import React, { Component } from 'react'

// everytime we want to run graphql queries, we need these two
import { graphql } from 'react-apollo' // to help us run the queries
import gql from 'graphql-tag' // write graphql queries

import Link from './Link'

class LinkList extends Component {
  render () {
    const { data } = this.props
    // the query is still loading
    if (data && data.loading) {
      return <div>Loading</div>
    }

    // the query has errors
    if (data && data.error) {
      return <div>{ data.error.message }</div>
    }

    // everything's fine, got the data back
    const linksToRender = data.feed.links
    let links = linksToRender.map(link => <Link key={link.id} link={link} />)
    return (
      <div>
        <h1>Not loading anymore</h1>
        { links }
      </div>
    )
  }
}

const FEED_LIST = gql`
  query FeedQuery {
    feed {
      links {
        id
        url
        description
      }
    }
  }
`

// graphql(NAMEOFTHEQUERY, {optional data name})(Component)
export default graphql(FEED_LIST)(LinkList)
