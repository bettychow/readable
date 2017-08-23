import React, { Component } from "react";
import { connect, bindActionCreators } from "react-redux";
import { fetchByPostId } from "../Actions";


class PostDetails extends Component {
  componentDidMount() {
    console.log('postId', this.props.match.params.id)
    this.props.fetchByPostId(this.props.match.params.id);
    console.log('postdetails')

  }

  render() {

    console.log(this.props.post)

    
    if(!this.props.post) {
      return <div></div>
    }
/*console.log('post', post)
    const time = timestamp => {
      let time = parseInt(timestamp);
      let d = new Date(time);
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }; */

    return (
      <div>
        <div>
          <ul>
            <li key={this.props.post.id}>
              <p>
                {this.props.post.title}
              </p>
              <p>
                {this.props.post.body}
              </p>
              <p>
                {this.props.post.author}
              </p>
              <p>
                {this.props.post.category}
              </p>
              <p>
                {this.props.post.voteScore}
              </p>
              <p>
                {/*time(post.timestamp)*/}
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.singlePostContainer.post
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchByPostId: (id) => dispatch(fetchByPostId(id)),
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
