import { BaseService } from "./BaseService";

export class UserService extends BaseService {
  static get entity () {
    return 'users'
  }
}