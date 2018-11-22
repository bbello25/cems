import { WebApiKey } from './webApiKey';
import { Role } from './Role';

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  token: string;
  roles?: Role[];
  webApiKey: WebApiKey;
}
