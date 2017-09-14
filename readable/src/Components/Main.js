import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPosts, sortByTime, sortByScore, fetchCats, createNewPost, fetchByPostId } from "../Actions";
import { bindActionCreators } from 'redux'
import Modal from 'react-modal'
import CreateNewPost from './CreateNewPost'


class Main extends Component {
  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchCategories()
  }

  state = {
    createPostModalOpen: false,
  }

  openCreatePostModal = () => {
    this.setState(() => ({
      createPostModalOpen: true,
    }))
  }

  closeCreatePostModal = () => {
    this.setState(() => ({
      createPostModalOpen: false,
    }))
  }

  handleChangeTime = (event) => {
    this.props.onSortPostsByTime(event.target.value)
  }

  handleChangeScore = event => {
    this.props.onSortPostsByScore(event.target.value)
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
        <li className="post-list" key={post.id}>
          <Link to={ `/post/${post.id}` }><h4>{post.title}</h4></Link>
          <p>By: {post.author}</p>
          <p>Likes: {post.voteScore}</p> 
          <p>time: {this.time(post.timestamp)}</p>
        </li>
      )
    })
  }

  renderCategoryList = () => {
    return this.props.categories.map(category => {
      return (
        <li className="categoryList" key={category.name}>
          <Link to ={`./${category.name}`} >{category.name}</Link>
        </li>
      )
    })
  }
  
  render() {
    const { createPostModalOpen } = this.state
    return (
      <div className="container">
        <div className="category-group">
          <h1>My Blog</h1>
          <h3>Get posts By Category</h3>
          <ul>
            { this.renderCategoryList() }
          </ul>   
        </div>
        <h2>All Posts</h2>
        <div className="buttons">
        <form>
        <label>
          Sort Post By Time:
          <select value={this.state.value} onChange={this.handleChangeTime}>
            <option />
            <option value="latestFirst">Latest First</option>
            <option value="oldestFirst">Oldest First</option>
          </select>
        </label>
      </form>
      <form>
        <label>
          Sort Post By Likes:
          <select value={this.state.value} onChange={this.handleChangeScore}>
            <option />
            <option value="lowestFirst">Lowest First</option>
            <option value="highestFirst">Highest First</option>
          </select>
        </label>
      </form>
        <button onClick={() => this.openCreatePostModal()}>
          Create New Post       
        </button>
        </div>
        <div className="post-list-group">
          <ul>
            {this.renderPostList()}
          </ul>
        </div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={createPostModalOpen}
          onRequestClose={this.closeCreatePostModal}
          contentLabel='Modal'
        >
         <div>
           <CreateNewPost />
           <button onClick={() => this.closeCreatePostModal()}>Close</button>
        </div>
        </Modal>
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
    onSortPostsByTime: (e) => dispatch(sortByTime(e)),
    onSortPostsByScore: (e) => dispatch(sortByScore(e)),
    onGetPostDetails: (id) => dispatch(fetchByPostId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
