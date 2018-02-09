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

    console.log('form submitted')

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
      <div>
        <h1>Form to create home here</h1>

        <p>
          State now:<br/>
          Title: {this.state.homeTitle}<br/>
          Price: {this.state.homePrice}<br/>
          Beds: {this.state.homeBeds}
        </p>

        <h2>Controlled form</h2>
        <form onSubmit={this.controlSubmitForm}>
          <label>
            Home Title:
            <input value={this.state.homeTitle}
              type="text" id="title"
              onChange={this.handleTitleChange} />
          </label><br/>
          <label>
            Home Price:
            <input value={this.state.homePrice}
              type="tel" id="price"
              onChange={this.handlePriceChange} />
          </label><br/>
          <label>
            # of Beds:
            <input value={this.state.homeBeds}
              type="tel" id="beds"
              onChange={this.handleBedsChange} />
          </label>
          <button>Control create</button>
        </form>

        <h2>Uncontrolled Form</h2>
        <input type="text" ref={input => this._homeTitle = input} />
        <button onClick={this.submitForm}>Create</button>
      </div>
    );
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
