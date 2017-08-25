import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPosts, sortByTime, fetchCats, createNewPost, fetchByPostId } from "../Actions";
import * as ReadableAPI from "../utils/ReadableAPI";
import { bindActionCreators } from 'redux'


class Main extends Component {
  componentDidMount() {
    console.log('mmm', this)
    this.props.fetchPosts()
    this.props.fetchCategories()
  }

  time = timestamp => {
      let time = parseInt(timestamp);
      let d = new Date(time); 
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;


    };

  renderPostList = () => {

    const filteredPosts = this.props.posts.filter(post => {
      return post.deleted === false
    })
    return filteredPosts.map(post => {
      return (
        <li key={post.id}>
          <Link to={ `/post/${post.id}` }>{post.title}</Link>
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
          <Link to ={`./${category.name}`} >{category.name}</Link>
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
