import React, { Component } from 'react';
import { getPost, addComment, upvotePost, deletePost } from '../services/api';
import { Link } from 'react-router-dom';

class Show extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      body: '',
      comments: [],
      commentBody: '',
      upvotes: ''
    }
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    var self = this;

    getPost(id).then(function(post) {
      self.setState({ id: post._id, title: post.title, 
                      body: post.body, comments: post.comments, upvotes: post.upvotes })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var self = this;
    
    addComment(this.state.id, this.state.commentBody).then(function(json) {
      getPost(self.state.id).then(function(post) {
        self.setState({ id: post._id, title: post.title, 
                        body: post.body, comments: post.comments, commentBody: '',
                        upvotes: post.upvotes })
      })
    });
  }

  handleCommentBody = (e) => {
    this.setState({ commentBody: e.target.value })
  }

  handleUpvote = (id, type) => {
    var self = this;

    upvotePost(id, type).then(function(json) {
      getPost(id).then(function(post) {
        self.setState({ id: post._id, title: post.title, 
                        body: post.body, comments: post.comments, commentBody: '',
                        upvotes: post.upvotes })
      })
    });
  }

  handleDownVote = (id, type) => {
    var self = this; 

    upvotePost(id, type).then(function(json) {
      getPost(id).then(function(post) {
        self.setState({ id: post._id, title: post.title, 
                        body: post.body, comments: post.comments, commentBody: '',
                        upvotes: post.upvotes })
      })
    });
  }

  handleDelete = (id) => {
      deletePost(id).then(function(json) {
          window.location= '/'
      });

  }

  render() {
    var comments = this.state.comments.map((comment, idx) => {
      return (
        <li key={idx}>
          {comment.body}
        </li>
      )
    });

    return(
      <div>
        <h2>{this.state.title}</h2>
        <br/>
        <p>{this.state.body}</p>
        <Link to={`/posts/${this.state.id}/edit`} className="btn btn-secondary">Edit Post</Link>
        <br/>
        <span>Upvotes: {this.state.upvotes}</span>
        <br/>
        <a href="#" className="btn btn-success" onClick={() => this.handleUpvote(this.state.id, "upvote")}>Upvotes <i className="fa fa-thumbs-up"></i></a>
        <br/>
        <br/>
        <a href="#" className="btn btn-danger"  onClick={() => this.handleDownVote(this.state.id, "downvote")}>Downvotes <i className="fa fa-thumbs-down"></i> </a>
        <br/>
        <br/>
        <a href="#" className="btn btn-danger"  onClick={() => this.handleDelete(this.state.id, "downvote")}>Delete Post <i className="fa fa-trash"></i> </a>
        <hr/>
        { this.state.comments.length < 1 ? 
            <h2>No Comments!</h2> 
            :
            <ul>
              { comments }
            </ul>  
         }
         <br/>
         <hr/>

         <form onSubmit={this.handleSubmit}>
           <label>Add Comment</label>
           <br/>
           <textarea onChange={this.handleCommentBody} value={this.state.commentBody}></textarea>
           <br/>
           <input type="submit" value="Add comment" className='btn btn-dark' />
         </form>
      </div>
    )
  }
}
export default Show;