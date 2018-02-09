import React, { Component } from 'react'
// everytime we want to run graphql queries, we need these two
import { graphql, compose } from 'react-apollo' // to help us run the queries
import gql from 'graphql-tag' // write graphql queries

// custom component
import Home from './Home'
import Link from './Link'
import CreateHomeForm from './CreateHomeForm'

class LinkList extends Component {
  render () {

    const { feedQuery, homesQuery  } = this.props
    // the query is still loading
    if (feedQuery && feedQuery.loading) {
      return <div>Loading</div>
    }

    // the query has errors
    if (feedQuery && feedQuery.error) {
      return <div>{ feedQuery.error.message }</div>
    }

    console.log('this.props.homesQuery', this.props.homesQuery.allHomes)
    // everything's fine, got the data back
    const linksToRender = feedQuery.feed.links
    let {allHomes} = this.props.homesQuery

    let links = linksToRender.map(link => <Link key={link.id} link={link} />)
    let allHomesList = allHomes.map(home => <Home key={home.id} {...home} />)
    return (
      <div>
        <h1>Airbnbo</h1>
        {/* hidden for now { links } */}
        { allHomesList }
        <CreateHomeForm />
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

const ALL_HOMES = gql`
  {
    allHomes {
      id,
      title,
      price,
      nbeds
    }
  }
`

// graphql(NAMEOFTHEQUERY, {optional data name})(Component)
export default compose(
  graphql(FEED_LIST, {name: 'feedQuery'}),
  graphql(ALL_HOMES, {name: 'homesQuery'})
)(LinkList)
