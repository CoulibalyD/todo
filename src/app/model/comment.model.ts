import {Task} from './task.model';

export interface Comment {
  id?: number;
  content: string;
  createdAt?: Date;
  taskId?: number;
}
