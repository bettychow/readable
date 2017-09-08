import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect, bindActionCreators } from "react-redux";
import { fetchByPostId, deleteByPostId, deleteByCommentId, vote, voteComment, fetchComments, fetchCommentById, sortCommentsByScore, sortCommentsByTime } from "../Actions";
import { Field, reduxForm } from 'redux-form'
import CreateNewComment from './CreateNewComment'
import EditPost from './EditPost'
import EditComment from './EditComment'
// import Comments from './Comments'
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
    commentModalOpen: false,
    byTime: "",
    byScore: ""
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

  handleChangeTime = (event) => {
    this.setState( {
      byTime: event.target.value
    })
    this.props.onSortCommentsByTime(event.target.value)
  }

  handleChangeScore = event => {
    this.setState({
      byScore: event.target.value
    })
    this.props.onSortCommentsByScore(event.target.value)
  }
  
  renderCommentList = () => {   
        return this.props.comments.map(comment => {
          return (
            <div>
              <li className="post-list" key={comment.id}>
                <p className="post-content">{comment.body}</p>
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
          <button onClick={() => this.openCommentModal()}>Reply</button>
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
    
        <div className="comment-list-group">
          <h2 className="comment-list-title">Comments</h2>
          <form>
            <label>
              Sort Comment By Time:
              <select value={this.state.value} onChange={this.handleChangeTime}>
                <option />
                <option value="latestFirst">Latest First</option>
                <option value="oldestFirst">Oldest First</option>
              </select>
            </label>
          </form>
          <form>
            <label>
              Sort Comment By Vote Score:
              <select value={this.state.value} onChange={this.handleChangeScore}>
                <option />
                <option value="lowestFirst">Lowest First</option>
                <option value="highestFirst">Highest First</option>
              </select>
            </label>
          </form>
          {this.renderCommentList()}
        </div>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={editCommentModalOpen}
          onRequestClose={this.closeEditCommentModal}
          contentLabel='Modal'
        >
         <div>
           <EditComment />
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
    fetchCommentById: id => dispatch(fetchCommentById(id)),
    onSortCommentsByTime: (e) => dispatch(sortCommentsByTime(e)),
    onSortCommentsByScore: (e) => dispatch(sortCommentsByScore(e)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)

