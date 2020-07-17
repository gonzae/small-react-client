import { User } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default class UserService {
  _data?: User[];

  async fetch() {
    const res = await fetch(API_URL);
    const data = await res.json();

    this._data = data;
  }

  getById(userId: number) : User | undefined {
    if(!this._data) return;

    return this._data.find( user => user.id === userId );
  }

}
