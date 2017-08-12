import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateNewPost from './CreateNewPost'
import { fetchByPostId } from '../Actions'
import * as ReadableAPI from '../utils/ReadableAPI'

class Main extends Component {
  
 

 
sortByTime = (posts) => {
  let x = this.state.posts
    x.sort(function(a,b) {
      return (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ?  1 : 0)
    })
      this.setState({ posts: x })
}

sortByScore = (posts) => {
  let y = this.state.posts
    y.sort(function(a,b) {
      return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);
      });
        this.setState({ posts: y });
}

  render () {
      const { categories, posts, onCreatePost, onGetPostByCat, onGetPostById } = this.props
      const time = (timestamp) => {
        let time =  parseInt(timestamp)
        let d = new Date(time)
        console.log('ddd', d)
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
console.log('ccc', categories)
console.log('ppp', posts)
  
  return (
    <div>
        <div >
            <ul>
                { categories.map(category => (
                    <li key={category.name}>
                        <a href="./category" onClick={
                           () => {
                               onGetPostByCat(category.name)
                           }
                        }>{category.name}</a>
                    </li>
                ))}
            </ul>
        </div>
        <div >
            <ul>
                { posts.map(post => (
                    <li key={post.id}>
                        <a href="./post/:id" onClick={
                            () => {
                                onGetPostById(post.id)
                            }
                        }><p>{post.title}</p></a>
                        <p>{post.author}</p>
                        <p>{post.voteScore}</p> 
                        <p>{time(post.timestamp)}</p>
                    </li>
                ))}
            </ul>
        </div>
        <button onClick={(posts) => this.sortByTime(posts)}>Latest Posts First</button>
        <button onClick={(posts) => this.sortByScore(posts)}>Posts With Highest Vote First</button>
     
          <CreateNewPost
            categories={categories}
            onCreatePost={onCreatePost}
          />
    </div>
    )
  }
}

/* const mapStateToProps = (state) => {
  return {
    postFoo: state.postConatiner.post,
  }
} */

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPostById: (data) => dispatch(fetchByPostId(data)),
    
  }
}


export default connect(
  
  mapDispatchToProps
)(Main)