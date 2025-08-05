import {Role} from './role.model';

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[]; // ou juste string si un seul rôle
}

