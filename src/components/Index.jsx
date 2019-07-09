import React, { Component } from 'react';
import { getPosts, upvotePost } from '../services/api';
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

  handleUpVote= (id, type) => {
    var self = this;
    upvotePost(id, type).then(function(post) {
      getPosts().then(function(json) {
        self.setState({posts: json})
      })
    })
    
  }

  handleDownVote= (id, type) => {
    var self = this;

    upvotePost(id, type).then(function(json) {
      getPosts().then(function(json) {
        self.setState({posts: json})
      })
    })

  }

  render() {
    var posts = this.state.posts.map((post, idx) => {
      return (
        <li key={idx}>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
          <br/>
          <a href="#" className='btn btn-success' onClick={() => this.handleUpVote(post._id, 'upvote')}>upvote <i className='fa fa-thumbs-up'></i></a>
          <br />
          <br />
          <span>Upvotes: {post.upvotes}</span>
          <a href="#" className='btn btn-danger' onClick={() => this.handleDownVote(post._id, 'downvote')}>downvote <i className='fa fa-thumbs-down'></i></a>
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