import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../Actions'
const randomID = require("random-id")

class CreateNewPost extends Component {

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
  values.timestamp = Date.now()
  values.voteScore = 0
  this.props.createPost(values, () => {
    this.props.history.push('/')
  })
}

  render () {

  const { handleSubmit, categories } = this.props
  console.log('kkk', categories)
  return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Category"
            name="category"
            component="select"
          >
            <option />
            {
                categories.map(category => (
                  <option value={ category.name}>{category.name}</option>
                ))
              }
          </Field>
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
  if(!values.category) {
    errors.category = "Enter a category"
  }
  if(!values.content) {
    errors.content = "Enter some content"
  }
  return errors
}

const mapStateToProps = state => {
  categories: state.allPostsContainer.categories
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(CreateNewPost)
)