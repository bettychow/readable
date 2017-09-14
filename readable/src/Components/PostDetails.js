import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect, bindActionCreators } from "react-redux";
import { fetchByPostId, deleteByPostId, vote, voteComment, fetchComments } from "../Actions";
import { Field, reduxForm } from 'redux-form'
import CreateNewComment from './CreateNewComment'
import EditPost from './EditPost'
import EditComment from './EditComment'
import Comments from './Comments'
import Modal from 'react-modal'
const randomID = require("random-id")

class PostDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.post_id
    this.props.fetchByPostId(id);  
    this.props.fetchComments(id)
  }

  state = {
    editPostModalOpen: false,
  }

  openEditPostModal = () => {
    this.setState(() => ({
      editPostModalOpen: true,
    }))
  }

  closeEditPostModal = () => {
    this.setState(() => ({
      editPostModalOpen: false,
    }))
  }

  time = timestamp => {
      let time = parseInt(timestamp);
      let d = new Date(time); 
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    };

  onDeletePost = id => {
    this.props.deleteByPostId(id,  
        this.props.history.push('/')
    )
  }

  onUpVote = id => {
    const option = {option: "upVote"}
    this.props.vote(id, option)
  }

  onDownVote = id => {
    const option = {option: "downVote"}
    this.props.vote(id, option)
  }

  render() {
 
    if(!this.props.post) {
      return <div></div>
    }
    if(!this.props.comments) {
      return <div></div>
    }
   
    const { editPostModalOpen } = this.state

    return (
      <div>
        <Link to="/">Home</Link>
        <Link className="link-to-cat" to ={`/${this.props.post.category}`} >Back to {this.props.post.category}</Link>
        <div>
          <div className="post-details-title"><h1>Post</h1></div>
          <ul className="post-list-group">
            <li className ="post-list" key={this.props.post.id}>
              <h4>
                {this.props.post.title}
              </h4>
              <p className="post-content">
                {this.props.post.body}
              </p>
              <p>
                by: {this.props.post.author}
              </p>
              <p>
                category: {this.props.post.category}
              </p>
              <p>
                likes: {this.props.post.voteScore}
              </p>
              <p>
                time: {this.time(this.props.post.timestamp)}
              </p>
            </li>
          </ul>
        </div>
        <div className="buttons">
          <button onClick={() => this.onUpVote(this.props.post.id)}>Thumbs Up</button>
          <button onClick={() => this.onDownVote(this.props.post.id)}>Thumbs Down</button>
          <button onClick={() => this.onDeletePost(this.props.post.id)}>Delete</button>
          <button onClick={() => this.openEditPostModal()}>Edit</button>
          
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={editPostModalOpen}
          onRequestClose={this.closeEditPostModal}
          contentLabel='Modal'
        >
          <div>
            <EditPost />
            <button onClick={() => this.closeEditPostModal()}>Close</button>
          </div>
        </Modal>
        < Comments />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
   post: state.singlePostContainer.post,
   comments: state.commentContainer.comments,
   comment: state.commentContainer.selectedComment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchByPostId: id => dispatch(fetchByPostId(id)),
    deleteByPostId: id => dispatch(deleteByPostId(id)),
    vote: (id, option) => dispatch(vote(id, option)),
    fetchComments: id => dispatch(fetchComments(id)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)

