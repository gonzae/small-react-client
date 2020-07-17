import React, { Component } from 'react';
import PostComponent from '../components/Post';
import './Home.css';
import { Post } from '../types';
import withPostService from "../hocs/with-post-service";

interface PropTypes {
  services?: any;
};

interface StateTypes {
  posts: Post[];
  fetched : boolean;
  clientId?: string;
};

class HomePage extends Component<PropTypes, StateTypes> {
  constructor(props:PropTypes) {
    super(props);
    this.state = {
      posts : [],
      fetched : false,
      clientId : undefined
    };
  }

  _getClientId = () => {
    let clientId = localStorage.getItem('data_clientId');
    if(!clientId) {
      const rand = Math.random() * 100000;
      clientId = Math.floor(rand).toString();
      localStorage.setItem('data_clientId', clientId);
    }
    return clientId;
  };

  async componentDidMount() {
    if(!this.state.fetched && this.props.services?.postService) {
      const { postService } = this.props.services;

      const posts = await postService.getAll();

      this.setState({ posts, fetched: true })
    }

    const clientId = this._getClientId();
    this.setState({clientId});
  }

  render() {
    return (
      <div className="HomePage">
        <div className="client-id">With clientId: {this.state.clientId}</div>
        {
          this.state.posts && this.state.posts.map( post => (
            <div key={post.id} className="Post-wrapper">
              <PostComponent
                username={post.user.username}
                city={post.user.address.city}
                title={post.title}
                body={post.body}
              />
            </div>
            )
          )
        }
      </div>
    )
  }
}

export default withPostService(HomePage);
