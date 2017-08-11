import React, { Component } from 'react'
import serializeForm from 'form-serialize'
const randomID = require("random-id")

class PostDetails extends Component {
  

updatePostInput = input => this.setState({ postInput: input })

handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        if (this.props.onCreatePost) 
            this.props.onCreatePost(values)
        }




  render () {

const { post } = this.props
const time = (timestamp) => {
      let time =  parseInt(timestamp)
      let d = new Date(time)
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }

  return (
    <div>
      <div >
            <ul>              
                    <li key={post.id}>
                        <p>{post.title}</p>    
                        <p>{post.body}</p>
                        <p>{post.author}</p>
                        <p>{post.category}</p>
                        <p>{post.voteScore}</p> 
                        <p>{time(post.timestamp)}</p>
                    </li>            
            </ul>
        </div>
      
    </div>
    )
  }
}


export default PostDetails;