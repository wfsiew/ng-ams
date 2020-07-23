import { Group } from './group';

export class User {
  constructor(
    public id?: number,
    public username?: string,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public buyer_id?: number,
    public mining_company_id?: number,
    public groups?: Group[]
  ) { }
}
