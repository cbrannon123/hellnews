import React, { Component } from 'react';
import { getPosts } from '../services/api';
import { Link } from 'react-router-dom';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    var self = this;

    getPosts().then(function(json) {
      self.setState({posts: json})
    })
  }

  render() {
    var posts = this.state.posts.map((post, idx) => {
      return (
        <li key={idx}>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
          <a heref="#" className='btn btn-success'>upvote <i className='fa fa-thumbs-up'></i></a>
          <br />
          <span>Upvotes: {post.upvotes}</span>
          <a href="#" className='btn btn-danger'>downvote <i className='fa fa-thumbs-down'></i></a>
        </li>
      )  
    });

    return(
      <div>
        <h2>React HN</h2>
        <hr/>
        <br/>

        <ul>
          { posts }
        </ul>
      </div>  
    )
  }
}

export default Index;