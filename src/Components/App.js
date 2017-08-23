import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as ReadableAPI from "../utils/ReadableAPI";
import CreateNewPost from "./CreateNewPost";
import PostDetails from "./PostDetails";
import Main from "./Main";
import Category from "./Category";
import "../App.css";

class App extends Component {
  // state = {
  //   categories: [],
  //   posts: [],
  //   postById: {},
  //   postByCat: []
  // };

  // componentDidMount() {}

  // sortByTime = posts => {
  //   let x = this.state.posts;
  //   x.sort(function(a, b) {
  //     return a.timestamp > b.timestamp ? -1 : b.timestamp > a.timestamp ? 1 : 0;
  //   });
  //   this.setState({ posts: x });
  // };
  //
  // sortByScore = posts => {
  //   let y = this.state.posts;
  //   y.sort(function(a, b) {
  //     return a.voteScore > b.voteScore ? -1 : b.voteScore > a.voteScore ? 1 : 0;
  //   });
  //   this.setState({ posts: y });
  // };
  //
  // createPost = post => {
  //   ReadableAPI.create(post).then(post => {
  //     this.setState(state => ({
  //       posts: state.posts.concat([post])
  //     }));
  //   });
  // };
  //
  // getPostbyId = id => {
  //   ReadableAPI.getPostById(id).then(post => {
  //     this.setState({ postById: post });
  //   });
  // };
  //
  // getPostByCat = cat => {
  //   ReadableAPI.getPostByCat(cat).then(posts => {
  //     this.setState({ postByCat: posts });
  //   });
  // };

  render() {
    // const { categories, posts } = this.state;
    // console.log("posts", posts);
    // const time = timestamp => {
    //   let time = parseInt(timestamp);
    //   let d = new Date(time);
    //   return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    // };

    return (
      <div className="App">
        <Route exact path="/post/post_new" component={CreateNewPost} />
        <Route path="/post/:post_id" component={PostDetails} />
        <Route 
          exact path="/" 
          render={() => 
            <Main />
          } />
        {/* <Route exact path="/:category" component={PostsByCategory} /> */}
       
      </div>
    );
  }
}

export default App;
