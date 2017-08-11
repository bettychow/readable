import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as ReadableAPI from './utils/ReadableAPI'
import CreateNewPost from './CreateNewPost'
import PostDetails from './PostDetails'
import Main from './Main'

import './App.css';

class App extends Component {

  state = {
    categories: [],
    posts: [],
    postById: {}
  }

  componentDidMount() {
    ReadableAPI.getAllCat().then((categories) => {
      this.setState({ categories })
    })
    ReadableAPI.getAllPosts().then((posts) => {
      posts.sort(function(a,b) {
    return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);
    });
      this.setState({ posts });
    })
  }

 
sortByTime = (posts) => {
  let x = this.state.posts
    x.sort(function(a,b) {
      return (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ?  1 : 0)
    })
      this.setState({ posts: x })
}

sortByScore = (posts) => {
  let y = this.state.posts
    y.sort(function(a,b) {
      return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);
      });
        this.setState({ posts: y });
}

createPost = (post) => {
  ReadableAPI.create(post).then(post => { 
      this.setState(state => ({
        posts: state.posts.concat([ post ])
      }))
       console.log('ppp', this.state.posts)
    })
}

/* getPostbyId = (id) => {
  ReadableAPI.getPost(id).then(post => {
    this.setState({ postById: post })
  })
} */

  render() {
    const { categories, posts } = this.state
console.log('posts', posts)
    const time = (timestamp) => {
      let time =  parseInt(timestamp)
      let d = new Date(time)
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
  
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <Main 
            posts={this.state.posts}
            categories={this.state.categories}
            onCreatePost={this.createPost}
          
          />
        )}/>
        <Route exact path="/post" render={() => (
          <PostDetails
            post={this.state.postById}
          />
        )}/>
        
      </div>
    );
  }
}

export default App;
