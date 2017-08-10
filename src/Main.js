import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Main extends Component {
  


  render () {
      const { categories, posts } = this.props
    

  posts.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} );
  console.log('kkk', posts)
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
                { posts. map(post => (
                    <li key={post.id}>
                        <p>{post.title}</p>
                        <p>{post.body}</p>
                        <p>{post.author}</p>
                        <p>{post.category}</p>
                        <p>{post.voteScore}</p>
                    </li>
                    
                ))}
            </ul>
        </div>
    </div>
    )
  }
}


export default Main;