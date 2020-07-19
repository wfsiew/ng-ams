import { Group } from './group';

export class User {
  constructor(
    public id?: number,
    public username?: string,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public groups?: Group[]
  ) { }
}
