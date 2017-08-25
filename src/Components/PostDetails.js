import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect, bindActionCreators } from "react-redux";
import { fetchByPostId, deleteByPostId, upVote, fetchComments } from "../Actions";
import { Field, reduxForm } from 'redux-form'
import CreateNewComment from './CreateNewComment'
const randomID = require("random-id")

class PostDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.post_id
    this.props.fetchByPostId(id);  
    this.props.fetchComments(id)
  }

  onDeletePost = id => {
    this.props.deleteByPostId(id,  
        this.props.history.push('/')
    
    )
  }

  onUpVote = id => {
    const option = "upVote" 
    this.props.upVote(id, option)
  }

  renderCommentList = () => {
    
    const commentsForThisPost = this.props.comments.map( comment => {
      return comment.parentId === this.props.post.id
    })
        return commentsForThisPost.map(comment => {
          return (
            <li key={comment.id}>
              <p>{comment.body}</p>
              <p>{comment.author}</p>
              <p>{comment.voteScore}</p> 
              <p>{this.time(comment.timestamp)}</p>
            </li>
          )
        })
      }

  render() {
 
    console.log(this.props)

    
    if(!this.props.post) {
      return <div></div>
    }

    const time = timestamp => {
      let time = parseInt(timestamp);
      let d = new Date(time);
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }; 
    const { handleSubmit, categories } = this.props


    return (
      <div>
        <Link to="/">Back to Home</Link>
        <div>
          <h1>Post</h1>
          <ul>
            <li key={this.props.post.id}>
              <p>
                {this.props.post.title}
              </p>
              <p>
                {this.props.post.body}
              </p>
              <p>
                {this.props.post.author}
              </p>
              <p>
                {this.props.post.category}
              </p>
              <p>
                {this.props.post.voteScore}
              </p>
              <p>
                {time(this.props.post.timestamp)}
              </p>
            </li>
          </ul>
        </div>
        <button onClick={() => this.onDeletePost(this.props.post.id)}>Delete</button>
        <button onClick={() => this.onUpVote(this.props.post.id)}>Thumbs Up</button>
        <button onClick={() => this.onDownVote(this.props.post.id)}>Thumbs Down</button>
        <Link to={ `/post/edit/${this.props.post.id}` }>Edit</Link>
    

        <h3>Reply</h3>
        <CreateNewComment />
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
   post: state.singlePostContainer.post,
   comments: state.commentContainer.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchByPostId: (id) => dispatch(fetchByPostId(id)),
    deleteByPostId: (id) => dispatch(deleteByPostId(id)),
    upVote: (id, option) => dispatch(upVote(id, option)),
    fetchComments: (id) => dispatch(fetchComments(id))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)

