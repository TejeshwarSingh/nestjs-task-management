import { TaskStatus } from '../tasks.model';
export class GetTasksFilterDto {
  Status?: TaskStatus;
  search?: string;
}
// use ? for optional 