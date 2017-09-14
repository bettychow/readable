import React, { Component } from "react";
import { connect, bindActionCreators } from "react-redux";
import Modal from 'react-modal'
import { deleteByCommentId, voteComment, fetchComments, fetchCommentById, sortCommentsByTime, sortCommentsByScore } from "../Actions";
import EditComment from './EditComment'
import CreateNewComment from './CreateNewComment'


class Comments extends Component {

  state = {
    editCommentModalOpen: false,
    commentModalOpen: false,
    byTime: "",
    byScore: ""
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

  onDeleteComment = id => {
    this.props.deleteByCommentId(id)
    //this.props.fetchComments(this.props.comment.parentId)
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
          <button onClick={() => this.onUpVote(this.props.comment.id)}>Thumbs Up</button>
          <button onClick={() => this.onDownVote(this.props.comment.id)}>Thumbs Down</button>
          <button onClick={() => this.onDeleteComment(comment.id)}>Delete</button>
          <button onClick={() => this.openEditCommentModal(comment.id)}>Edit</button>
        </div>
      )
    })
  }
  time = timestamp => {
    let time = parseInt(timestamp);
    let d = new Date(time); 
    return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  };

  render() {

    if(!this.props.comments) {
      return <div></div>
    }
    const { comments } = this.props
    const { commentModalOpen, editCommentModalOpen } = this.state

    return (
   <div>
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
    <button onClick={() => this.openCommentModal()}>Reply</button>
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

    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentContainer.comments,
    comment: state.commentContainer.selectedComment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteByCommentId: id => dispatch(deleteByCommentId(id)),
    //vote: (id, option) => dispatch(vote(id, option)),
    fetchComments: id => dispatch(fetchComments(id)),
    fetchCommentById: id => dispatch(fetchCommentById(id)),
    onSortCommentsByTime: (e) => dispatch(sortCommentsByTime(e)),
    onSortCommentsByScore: (e) => dispatch(sortCommentsByScore(e)),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Comments)