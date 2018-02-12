import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateHomeForm extends Component {

  submitForm = () => { // currying a function
    alert(this._homeTitle.value)
  }

  constructor() {
    super()
    this.state = { // not setState. equals an object
      homeTitle: '',
      homePrice: 0,
      homeBeds: 0
    }
  }

  controlSubmitForm = async (e) => {
    e.preventDefault()
    let { homeTitle: title, homePrice: price, homeBeds: nbeds } = this.state

    await this.props.mutate({
      variables: {
        title,
        price,
        nbeds
      }
    })

    // if there's sth else we want to do here
    // we'll make sure the mutation method is completed
    // redirection / state update / whatever happens next
  }

  handleTitleChange = (e) => {
    this.setState({
      homeTitle: e.target.value
    })
  }

  handlePriceChange = (e) => {
    this.setState({
      homePrice: e.target.value
    })
  }

  handleBedsChange = (e) => {
    this.setState({
      homeBeds: e.target.value
    })
  }

  render() {
    return (
      <form className="pa4 black-80" onSubmit={this.controlSubmitForm}>
        <div className="measure">
          <label htmlFor="title" className="f6 b db mb2">Title</label>
          <input id="title"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="text"
            value={this.state.homeTitle}
            onChange={this.handleTitleChange}
          />
          <small id="title-desc" className="f6 black-60 db mb2">Write your listing title</small>
        </div>
        <div className="measure">
          <label htmlFor="nbeds" className="f6 b db mb2"># of Beds</label>
          <input id="nbeds"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="text"
            value={this.state.homeBeds}
            onChange={this.handleBedsChange}
          />
        </div>
        <div className="measure">
          <label htmlFor="price" className="f6 b db mb2">Price</label>
          <input id="price"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="number"
            value={this.state.homePrice}
            onChange={this.handlePriceChange}
          />
          <small id="price-desc" className="f6 black-60 db mb2">Your listing price</small>
        </div>
        <div className="mt3">
          <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Submit" />
        </div>
        {/* <h2>Uncontrolled Form</h2>
          <input type="text" ref={input => this._homeTitle = input} />
          <button onClick={this.submitForm}>Create</button> */}
      </form>
    )
  }
}

const CREATE_HOME = gql`
  mutation HomeMutation($title: String!, $price: Int!, $nbeds: Int) { #mutation name
    createHome(title: $title, price: $price, nbeds: $nbeds) { #resolver name
      title,
      price
    }
  }
`

export default graphql(CREATE_HOME)(CreateHomeForm);
