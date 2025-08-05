import {User} from './user.model';
import {Tag} from './tag.model';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status?: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
  completed?: boolean;
  tags?: Tag[];
  comments?: Comment[];
  user?: User;
}
