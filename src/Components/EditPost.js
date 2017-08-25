import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updatePost } from '../Actions'
const randomID = require("random-id")

class EditPost extends Component {

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
    newValues.title = values.title
    this.props.updatePost(newValues, id, this.props.history.push(`/post/${id}`) )
  }

  render() {

    const { handleSubmit, categories, id } = this.props

    return (
      <div>
        <h1>Edit Post</h1>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <span>Category: </span><span>{this.props.initialValues.category}</span>
          <Field
            label="Content"
            name="body"
            component={this.renderField}
          />
          <span>Author: </span><span>{this.props.initialValues.author}  </span>
          <span>Time: </span><span>{this.props.initialValues.timestamp}</span>
          <div>
          <button type="submit">Submit</button>
          <Link to="/">
            Cancel
          </Link>
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
    categories: state.allPostsContainer.categories,
    initialValues: state.singlePostContainer.post,
  }
}


EditPost = reduxForm({
  validate,
  form: 'PostsEditForm'
})(EditPost)


export default connect(mapStateToProps, { updatePost })(EditPost)
