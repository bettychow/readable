import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as ReadableAPI from './utils/ReadableAPI'

import './App.css';

class App extends Component {

  state = {
    categories: [],
    posts: [],
    isDisplay: false,
  }

  componentDidMount() {
    ReadableAPI.getAllCat().then((categories) => {
      this.setState({ categories })
    })
    ReadableAPI.getAllPosts().then((posts) => {
      this.setState({ posts });
    })
  }
 

  render() {
    const { categories, posts } = this.state
    

  posts.sort(function(a,b) {return (a.voteScore > b.voteScore) ? -1 : ((b.voteScore > a.voteScore) ? 1 : 0);} );
  
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
                        <div onClick={() => { this.setState({ isDisplay: !this.state.isDisplay }) }}>
                        <p>{post.body}</p>
                        <p>{post.author}</p>
                        <p>{post.category}</p>
                        <p>{post.voteScore}</p>
                        </div>
                    </li>
                    
                ))}
            </ul>
        </div>
      </div>
    );
  }
}

export default App;
