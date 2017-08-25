import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createComment } from '../Actions'
const randomID = require("random-id")

class CreateNewComment extends Component {

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
  
  onSubmit = values => {
    values.id = randomID()
    values.parentId = this.props.post.id
    values.timestamp = Date.now()
    values.voteScore = 0
    this.props.createComment(values)
  }

  render() {


    const { handleSubmit, categories, id } = this.props
    return (
      <div>

      
      <form onSubmit={handleSubmit(this.onSubmit)}>
        
        <Field
          label="Content"
          name="body"
          component={this.renderField}
        />
        <Field
          label="Name"
          name="author"
          component={this.renderField}
        />
        
        <button type="submit">Submit</button>
        <Link to="/">
          Cancel
        </Link>
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
  if(!values.body) {
    errors.body = "Enter some content"
  }
  if(!values.author) {
    errors.author = "Enter your name"
  }
  return errors
}

const mapStateToProps = state => {
  return {
   post: state.singlePostContainer.post,
   categories: state.allPostsContainer.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createComment: (values) => dispatch(createComment(values))
  };
};


export default reduxForm({
  validate,
  form: 'CommentNewForm'
})(
  connect(mapStateToProps, mapDispatchToProps)(CreateNewComment)
)