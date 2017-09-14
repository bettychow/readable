import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ListOfPosts extends Component {

  renderPostList = () => {
    
        const filteredPosts = this.props.posts.filter(post => {
          return post.deleted === false
        })
        return filteredPosts.map(post => {
          return (
            <li className="post-list" key={post.id}>
              <Link to={ `/post/${post.id}` }><h4>{post.title}</h4></Link>
              <p>By: {post.author}</p>
              <p>Likes: {post.voteScore}</p> 
              <p>time: {this.time(post.timestamp)}</p>
            </li>
          )
        })
      }

  render() {

    const { renderPostList, onSortPostsByTime, sortByScore, posts } = this.props

    return (
      <div>
        {renderPostList}
      </div>
    )
  }
}