import React, { Component, ComponentType } from "react";
import PostService from "../lib/postService";
import UserService from "../lib/userService";

interface PropTypes {
}

interface StateTypes {
}

interface withPostServiceTypes {
  services?: StateTypes;
}

export default function (ComposedComponent: ComponentType<withPostServiceTypes>) {
  class withPostService extends Component<PropTypes, StateTypes> {
    postService: PostService;

    constructor(props: PropTypes) {
      super(props);

      const userService = new UserService();
      this.postService = new PostService(userService);
    }

    render() {
      const services = {
        postService : this.postService
      };

      return (
        <ComposedComponent {...this.props} services={services} />
      );
    }
  }
  return withPostService;
}