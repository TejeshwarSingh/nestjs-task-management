import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.model';
export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  Status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
// use ? for optional 

