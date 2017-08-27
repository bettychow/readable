import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPosts, sortByTime, sortByScore, fetchCats, createNewPost, fetchByPostId } from "../Actions";
import * as ReadableAPI from "../utils/ReadableAPI";
import { bindActionCreators } from 'redux'
import Modal from 'react-modal'
import CreateNewPost from './CreateNewPost'


class Main extends Component {
  componentDidMount() {
    console.log('mmm', this)
    this.props.fetchPosts()
    this.props.fetchCategories()
  }

  state = {
    createPostModalOpen: false,
    byTime: "",
    byScore: ""
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
    this.setState( {
      byTime: event.target.value
    })
    this.props.onSortPostsByTime(event.target.value)
  }

  handleChangeScore = event => {
    this.setState({
      byScore: event.target.value
    })
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
    const { createPostModalOpen } = this.state
    console.log(this.state)
    return (
      <div>
        <div>
          <ul>
            { this.renderCategoryList() }
          </ul>   
        </div>
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
          Sort Post By Vote Score:
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
        <div>
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
