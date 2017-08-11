import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as ReadableAPI from './utils/ReadableAPI'
import CreateNewPost from './CreateNewPost'

import './App.css';

class App extends Component {

  state = {
    categories: [],
    posts: [],
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
  render() {
    const { categories, posts } = this.state

    const time = (timestamp) => {
      let d = new Date(timestamp)
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
  
    return (
      <div className="App">
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
                { posts.map(post => (
                    <li key={post.id}>
                        <p>{post.title}</p>    
                        <p>{post.body}</p>
                        <p>{post.author}</p>
                        <p>{post.category}</p>
                        <p>{post.voteScore}</p> 
                        <p>{time(post.timestamp)}</p>
                    </li>
                ))}
            </ul>
        </div>
        <button onClick={(posts) => this.sortByTime(posts)}>Latest Posts First</button>
        <button onClick={(posts) => this.sortByScore(posts)}>Posts With Highest Vote First</button>
        <div>
          <CreateNewPost
            categories={this.state.categories}
          />
        </div>
      </div>
    );
  }
}

export default App;
