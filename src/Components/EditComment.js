import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCommentById, updateComment, fetchComments } from '../Actions'
// import { updateComment } from '../Actions'
const randomID = require("random-id")
 
class EditComment extends Component {


  renderField = (field) => {
    const { meta: { touched, error } }  = field
    const className = `form-group ${ touched && error ? 'has-danger' : '' }`
  
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input 
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit = (values) => {
    const id = values.id
    let newValues = {}
    newValues.body = values.body
    this.props.updateComment(newValues, id)
    this.props.fetchComments(values.parentId)
  }

  time = timestamp => {
    let time = parseInt(timestamp);
    let d = new Date(time); 
    return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  };

  render() {
  
    if(!this.props.initialValues) {
      return <div></div>
    } 


   

    const { handleSubmit, categories, id } = this.props

    return (
      <div>
        <h1>Edit Comment</h1>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            label="Content"
            name="body"
            component={this.renderField}
          />
          <span>Author: </span><span>{this.props.initialValues.author}  </span>
          <span>Time: </span><span>{this.props.initialValues.timestamp}</span>
          <div>
          <button type="submit">Submit</button> 
        
          </div>
        </form>
      </div> 
    )
  }
}
const validate = (values) => {
  const errors = {}

  if(!values.title) {
    errors.title = "Enter a title"
  }
  if(!values.category) {
    errors.category = "Enter a category"
  }
  if(!values.content) {
    errors.content = "Enter some content"
  }
  return errors
}

const mapStateToProps = state => {
  return {
    initialValues: state.commentContainer.selectedComment
  }
}


EditComment = reduxForm({
  validate,
  form: 'CommentEditForm',
  enableReinitialize : true
})(EditComment)


export default connect(mapStateToProps, { fetchCommentById, updateComment, fetchComments })(EditComment)
