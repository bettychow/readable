import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect, bindActionCreators } from 'react-redux'
const randomID = require("random-id")

class PostDetails extends Component {
  
  render () {

const { post } = this.state

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

const mapStateToProps = (state) => {
  return {
    post: state.post,
  }
}

export default connect(mapStateToProps)(PostDetails);
