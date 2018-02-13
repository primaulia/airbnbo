import React, { Component } from 'react'
// everytime we want to run graphql queries, we need these two
import { graphql, compose } from 'react-apollo' // to help us run the queries
import gql from 'graphql-tag' // write graphql queries

// custom component
import Home from './Home'
import Link from './Link'
import CreateHomeForm from './CreateHomeForm'
import Card from './Card'

class LinkList extends Component {
  constructor() {
    super()
    this.state = {
      deck_id: "",
      cards: []
    }
  }

  draw = async () => {
    let drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${ this.state.deck_id }/draw/?count=5`)
    let { cards } = await drawResponse.json()

    this.setState({
      cards
    })
  }

  render () {
    const { feedQuery, homesQuery } = this.props
    // the query is still loading
    if (feedQuery && feedQuery.loading) {
      return (
        <article className='pa3 ph5-ns'>
          <div>
            Loading...
          </div>
        </article>
      )
    }

    // the query has errors
    if (feedQuery && feedQuery.error) {
      return (
        <article className='pa3 ph5-ns'>
          <div>
            { feedQuery.error.message }
          </div>
        </article>
      )
    }

    // everything's fine, got the data back
    const linksToRender = feedQuery.feed.links
    let {allHomes} = homesQuery

    let links = linksToRender.map(link => <Link key={link.id} link={link} />)
    let allHomesList = allHomes.map(home => <Home key={home.id} {...home} />)
    return (
      <main className='bg-white'>
        {/* <div className='fn fl-ns w-30-ns pr4-ns'>
          <CreateHomeForm />
          </div>
          <div className='fn fl-ns w-70-ns pr4-ns'>
          { allHomesList }
        </div> */}
        <div className='w-100-ns pr4-ns pa3 ph5-ns'>
          <h1>Card List</h1>
          {/* This part here will show all of my card from the api */}
          <div>
            <button onClick={this.draw} className="f6 link dim br3 ph3 pv2 mb2 dib white bg-black">
              Draw
            </button>
          </div>
          <div>
            {
              this.state.cards.map(({image, code}) => {
                return (
                  <Card key={code} cardImg={image} />
                )
              })
            }
          </div>
        </div>
      </main>
    )
  }

  componentDidMount = async () => {
    const DECK_API = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

    let response = await fetch(DECK_API) // got a response (StreamBuffer obj)
    let { deck_id } = await response.json() // call with .json() => json obj
    let drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${ deck_id }/draw/?count=5`)
    let { cards } = await drawResponse.json()

    console.log(cards)

    this.setState({
      deck_id,
      cards
    })
  }

  componentWillReceiveProps (newProps) {
    var document = gql`
      subscription {
        subsToNewHome {
          node {
            id
            title
            price
            nbeds
      		}
        }
      }
    `

    const updateQuery = (previous, {subscriptionData}) => {
      // console.log('called')
      // // console.log(`previous: ${JSON.stringify(previous)}`)
      // // console.log(`subscriptionData: ${JSON.stringify(subscriptionData)}`)
      // const newHome = subscriptionData.data.subsToNewHome.node
      // const { allHomes } = previous
      // const allNewHomes = [newHome, ...allHomes]
      //
      // // console.log(`newHomes: ${JSON.stringify(newHome)}`)
      // // console.log(allNewHomes)
      // const result = {
      //   allHomes: allNewHomes
      // }
      //
      // return result

      return
    }

    this.props.homesQuery.subscribeToMore({
      document,
      updateQuery
    })
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
