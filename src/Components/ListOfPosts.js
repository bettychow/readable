import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ListOfPosts extends Component {

  render() {

    const { renderPostList, onSortPostsByTime, sortByScore } = this.props

    return (
      <div>
        <div>
          <ul>
            {this.props.renderPostList}
          </ul>
        </div>
        <button onClick={ () => this.props.onSortPostsByTime}>
          Latest Posts First
        </button>
        <button onClick={() => this.props.sortByScore}>
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