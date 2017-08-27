import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect, bindActionCreators } from "react-redux";
import { fetchByPostId, deleteByPostId, deleteByCommentId, vote, voteComment, fetchComments, fetchCommentById } from "../Actions";
import { Field, reduxForm } from 'redux-form'
import CreateNewComment from './CreateNewComment'
import EditPost from './EditPost'
import EditComment from './EditComment'
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
    editCommentModalOpen: false,
    commentModalOpen: false
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
  openEditCommentModal = (id) => {
    this.setState(() => ({
      editCommentModalOpen: true,
    }))
    this.props.fetchCommentById(id)
  }

  closeEditCommentModal = () => {
    this.setState(() => ({
      editCommentModalOpen: false,
    }))
  }
  openCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: true,
    }))
  }

  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false,
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

  onDeleteComment = id => {
    this.props.deleteByCommentId(id)
    this.props.fetchComments(this.props.match.params.post_id)
  }

  
  
  renderCommentList = () => {   
    console.log('ssss', this.props.comment)
        return this.props.comments.map(comment => {
          return (
            <div>
              <li key={comment.id}>
                <p>{comment.body}</p>
                <p>{comment.author}</p>
                <p>{comment.voteScore}</p> 
                <p>{this.time(comment.timestamp)}</p>
              </li>
              <button onClick={() => this.onDeleteComment(comment.id)}>Delete</button>
              <button onClick={() => this.openEditCommentModal(comment.id)}>Edit</button>
            </div>
          )
        })
      }

  render() {
 
    if(!this.props.post) {
      return <div></div>
    }
    if(!this.props.comments) {
      return <div></div>
    }
   
    const { handleSubmit, categories } = this.props
    const { editPostModalOpen, commentModalOpen, editCommentModalOpen } = this.state

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
                {this.time(this.props.post.timestamp)}
              </p>
            </li>
          </ul>
        </div>
        <button onClick={() => this.onUpVote(this.props.post.id)}>Thumbs Up</button>
        <button onClick={() => this.onDownVote(this.props.post.id)}>Thumbs Down</button>
        <button onClick={() => this.onDeletePost(this.props.post.id)}>Delete</button>
        <button onClick={() => this.openEditPostModal()}>Edit</button>
        <button onClick={() => this.openCommentModal()}>Reply</button>
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
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commentModalOpen}
          onRequestClose={this.closeCommentModal}
          contentLabel='Modal'
        >
         <div>
           <CreateNewComment />
           <button onClick={() => this.closeCommentModal()}>Close</button>
           </div>
        </Modal>
    
        <div>{this.renderCommentList()}</div>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={editCommentModalOpen}
          onRequestClose={this.closeEditCommentModal}
          contentLabel='Modal'
        >
         <div>
           <EditComment id={this.props.comment.id}/>
           <button onClick={() => this.closeEditCommentModal()}>Close</button>
           </div>
        </Modal>
       
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
    deleteByCommentId: id => dispatch(deleteByCommentId(id)),
    vote: (id, option) => dispatch(vote(id, option)),
    fetchComments: id => dispatch(fetchComments(id)),
    fetchCommentById: id => dispatch(fetchCommentById(id))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)

