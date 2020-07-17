import UserService from './userService';
import { Post } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

type ApiPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default class PostService {
  _userService: UserService;
  _data: Post[];

  constructor(userService: UserService) {
    this._userService = userService;
    this._data = [];
  }

  async _fetch() {
    const storageData = localStorage.getItem('data_postsData');
    let postsData = storageData ? JSON.parse(storageData) : null;
    if(!postsData) {
      const res = await fetch(API_URL);
      const data = await res.json();
  
      await this._userService.fetch();
  
      postsData = data.map((p:ApiPost) => {
        return {
          user: this._userService.getById(p.userId),
          id: p.id,
          title: p.title,
          body: p.body,
        };
      });

      localStorage.setItem('data_postsData', JSON.stringify(postsData));
    }

    this._data = postsData;
  }

  async getAll() {
    if(!this._data.length) await this._fetch();

    return this._data;
  }

}
