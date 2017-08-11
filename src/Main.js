import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CreateNewPost from './CreateNewPost'

class Main extends Component {
  


  render () {
      const { categories, posts, onCreatePost, getPost } = this.props
    const time = (timestamp) => {
      let time =  parseInt(timestamp)
      let d = new Date(time)
      console.log('ddd', d.getMonth())
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
                        <a>{category.name}</a>
                    </li>
                ))}
            </ul>
        </div>
        <div >
            <ul>
                { posts.map(post => (
                    <li key={post.id}>
                        <a href="./post" ><p>{post.title}</p></a>
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


export default Main;