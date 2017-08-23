import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPosts, sortByTime, fetchCats, createNewPost, fetchByPostId } from "../Actions";
import * as ReadableAPI from "../utils/ReadableAPI";
import { bindActionCreators } from 'redux'
import PostDetails from './PostDetails'

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
    return this.props.posts.map(post => {
      return (
        <li key={post.id}>
          <p onClick={() => this.props.onGetPostDetails(post.id)} >{post.title}</p>
          <p>{post.author}</p>
          <p>{post.voteScore}</p> 
          <p>{this.time(post.timestamp)}</p>
        </li>
      )
    })
  }

  renderCategoryList = () => {
    console.log('ppp', this.props.categories)
    return this.props.categories.map(category => {
      return (
        <li key={category.name}>
          <a href="./category" >{category.name}</a>
        </li>
      )
    })
  }

  render() {
    
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
        <div>
          <PostDetails />
          </div>
        <button onClick={ () => this.props.onSortPostsByTime()}>
          Latest Posts First
        </button>
        <button onClick={() => this.props.sortByScore()}>
          Posts With Highest Vote First
        </button>
        <button>
          <Link to="/post/post_new">
            Create New Post 
          </Link>
        </button>
        
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
    onSortPostsByTime: () => dispatch(sortByTime()),
    onGetPostDetails: (id) => dispatch(fetchByPostId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
