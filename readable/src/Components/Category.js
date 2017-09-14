import React, { Component } from 'react'
import { fetchByCategory, sortByTimeCat, sortByScoreCat } from '../Actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import CreateNewPost from './CreateNewPost'

class Category extends Component {
  
  componentDidMount() {
   this.props.fetchPostsByCategory(this.props.match.params.category)

  let cat = this.props.match.params.category 
  this.props.fetchPostsByCategory(cat)

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

  handleChangeTime = event => {
    this.props.onSortPostsByTime(event.target.value)
  }

  handleChangeScore = event => {
    this.props.onSortPostsByScore(event.target.value)
  }

  render () {
    const { createPostModalOpen } = this.state
    
    const time = (timestamp) => {
      let time =  parseInt(timestamp)
      let d = new Date(time)
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }

  return (
    <div>
      <Link className= "link-to-cat" to="/">Back to Home</Link>
      <div className="post-details-title">
        <h1>{this.props.match.params.category}</h1>
      </div>
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
      <ul>              
        {this.props.posts.map(post => {
          return (
            <li className="post-list" key={post.id}>
            <Link to={ `/post/${post.id}` }><h4>{post.title}</h4></Link>
              <p>by: {post.author}</p>
              <p>likes: {post.voteScore}</p>
              <p>time: {time(post.timestamp)}</p>
            </li>
          )
        })                      
        } 
      </ul>  
    </div>
    )
  }
}

const mapStateToProps = state => { 
  return {
    posts: state.postByCatContainer.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPostsByCategory: category => dispatch(fetchByCategory(category)),
    onSortPostsByTime: (e) => dispatch(sortByTimeCat(e)),
    onSortPostsByScore: (e) => dispatch(sortByScoreCat(e))
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)