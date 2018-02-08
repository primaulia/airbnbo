import React, { Component } from 'react'

class Link extends Component {

  render () {
    let { description, url } = this.props.link

    return (
      <div>
        <div>
          { description } ({ url })
        </div>
      </div>
    )
  }

}

export default Link
