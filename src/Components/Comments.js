import React, { Component } from "react";
import { connect, bindActionCreators } from "react-redux";
import { fetchByPostId, deleteByPostId, deleteByCommentId, vote, voteComment, fetchComments, fetchCommentById } from "../Actions";


class Comments extends Component {

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
    const { comments } = this.props
    return (
    <div>
     {this.renderCommentList}
    </div>


    )
  }
}

const mapStateToProps = (state) => {
  comments: state.commentContainer.comments
}



export default connect(mapStateToProps, null)(Comments)