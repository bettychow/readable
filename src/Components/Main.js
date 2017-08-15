import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CreateNewPost from "./CreateNewPost";
import { fetchPosts, sortByTime, fetchCats } from "../Actions";
import * as ReadableAPI from "../utils/ReadableAPI";
import { bindActionCreators } from 'redux'

class Main extends Component {
  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchCategories()
  }

  time = timestamp => {
      let time = parseInt(timestamp);
      let d = new Date(time); 
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;


    };

  renderPostList = () => {
    console.log('ooooooooooooooooo')
    return this.props.posts.map(post => {
      return (
        <li key={post.id}>
          <a href={`/post/${post.id}`}><p>{post.title}</p></a>
          <p>{post.author}</p>
          <p>{post.voteScore}</p> 
          <p>{this.time(post.timestamp)}</p>
        </li>
      )
    })
  }

  renderCategoryList = () => {
    return this.props.categories.map(category => {
      return (
        <li key={category.name}>
          <a href="./category" >{category.name}</a>
        </li>
      )
    })
  }

    /* onSortPostsByTime = () => {
      const x = this.props.posts.sort((a,b) => {
      if(a.timestamp > b.timestamp) {
        return -1
      } else if ( a.timestamp < b.timestamp) {
        return 1
      } else {
        return 0
      }
      })
      console.log('sorted fun ', x)
      return x
    } */
  

  render() {
    
    // const { posts, categories, onSortPostsByTime } = this.props;

   console.log('posts', this.props.posts)
    const time = timestamp => {
      let time = parseInt(timestamp);
      let d = new Date(time); 
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;


    };

    return (
      <div>
        <div>
          <ul>
            { this.renderCategoryList() }
          </ul>
        </div>
        <div>
          <ul>
            {this.renderPostList()}
          </ul>
        </div>
        <button onClick={ () => this.props.onSortPostsByTime(this.props.posts)}>
          Latest Posts First
        </button>
        <button onClick={() => this.props.sortByScore()}>
          Posts With Highest Vote First
        </button>

        {/* <CreateNewPost categories={categories} onCreatePost={onCreatePost} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.allPostsContainer.posts,
    categories: state.allPostsContainer.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCategories: () => dispatch(fetchCats()),
    onSortPostsByTime: (posts) => dispatch(sortByTime(posts))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
