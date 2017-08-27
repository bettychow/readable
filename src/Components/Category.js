import React, { Component } from 'react'
import { fetchByCategory, sortByTimeCat, sortByScoreCat } from '../Actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Category extends Component {
  
  componentDidMount() {
    this.props.fetchPostsByCategory(this.props.match.params.category)
  }

  render () {
    
    const time = (timestamp) => {
      let time =  parseInt(timestamp)
      let d = new Date(time)
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }

  return (
    <div>
        <Link to="/">Back to Home</Link>
      <h1>{this.props.match.params.category}</h1>
      <ul>              
        {this.props.posts.map(post => {
          return (
            <li key={post.id}>
            <Link to={ `/post/${post.id}` }><p>{post.title}</p></Link>
              <p>{post.author}</p>
              <p>{post.voteScore}</p>
              <p>{time(post.timestamp)}</p>
            </li>
          )
        })                      
        } 
      </ul>   
      <button onClick={ () => this.props.onSortPostsByTime()}>
          Latest Posts First
        </button>
        <button onClick={() => this.props.onSortPostsByScore()}>
          Posts With Highest Vote First
        </button>
      <button>
          <Link to="/post/post_new">
            Create New Post 
          </Link>
        </button>
    </div>
    )
  }
}

const mapStateToProps = state => { 
  return {
    posts: state.postByCatContainer.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPostsByCategory: category => dispatch(fetchByCategory(category)),
    onSortPostsByTime: () => dispatch(sortByTimeCat()),
    onSortPostsByScore: () => dispatch(sortByScoreCat())
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)