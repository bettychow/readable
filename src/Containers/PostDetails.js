import React, { Component } from 'react';
import { connect, bindActionCreators } from 'react-redux';
import * as actions from '../Actions';

class PostDetailsCon extends Component {
  componentDidMount() {
    this.props.fetchByPostId(this.props.match.params.id);
  }

  render() {
    return (
      <PostDetails post={this.props.postFoo} />
    )
  }
}

// State => Props
mapStateToProps = (state) => {
  return {
    postFoo: state.postConatiner.post,
  }
}

export default connect(mapStateToProps, { actions })(PostDetailsCon);
