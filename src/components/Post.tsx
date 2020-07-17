import React, { Component } from 'react';
import './Post.css';

interface PropTypes {
  username: string,
  city: string,
  title: string
  body: string
}

class Post extends Component<PropTypes> {
  render() {
    const { title, body, username, city } = this.props;

    return (
      <div className="Post">
        <h2>{title}</h2>
        <h3>By @{username} from {city}</h3>
        <div className="post-body">{body}</div>
      </div>
    )
  }
}

export default Post;
