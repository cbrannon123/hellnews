import React, { Component } from 'react';
import { createPosts } from '../services/api'

class Create extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: ''
    }
  }

  handleTitle = (e) => {
    this.setState({ title: e.target.value })
  }
  handleBody = (e) => {
    this.setState({ body: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    createPosts(this.state).then(function () {
      window.location = '/'
    })
  }

  render() {
    return (
      <div>
        <h1>Enter Game </h1>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <label>Post Title</label>
          <input onChange={this.handleTitle} value={this.state.title} />
          <br />

          <label> Post Body</label>
          <textarea onChange={this.handleBody} name='platform' value={this.state.body}></textarea>
          <br />
          <input type="submit" value="Submit Post" />
        </form>
      </div>
    )
  }
}

export default Create;