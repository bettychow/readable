import React, { Component } from 'react'
import serializeForm from 'form-serialize'

class CreateNewPost extends Component {
  
state = {
    postInput: '',
    selectedValue: ''
}

updatePostInput = input => this.setState({ postInput: input })

handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        if (this.props.onCreatePost) 
            this.props.onCreatePost(values)
        }

handleChange = (e) => {
  this.setState({ selectedValue: e.target.value})
}

  render () {
const { postInput, selectedValue } = this.state
const { categories } = this.props
  console.log('kkk', categories)
  return (
    <div>
      <h2>Add A New Post</h2>
      <form onSubmit={this.handleSubmit}>
        <div>
          <input type="text" name="title" placeholder="Title"/>
          <textArea type="text" name="body" placeholder="Content"/>
          <input type="hidden" id="date" name="timestamp"/>
            <script type="text/javascript">
            document.getElementById('date').value = Date.now();
            </script>
          <input type="text" name="author" placeholder="Your Name"/>
          <select value={selectedValue} onChange={this.handleChange}>
              {
                  categories.map(category => {
                      <option value={ category.name}>{category.name}</option>
                  })
              }
          </select>
          <button>Submit New Post</button>
        </div>
      </form>        
    </div>
    )
  }
}


export default CreateNewPost;