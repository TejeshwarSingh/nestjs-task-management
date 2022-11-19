import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Logger,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { get } from 'http';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Console } from 'console';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return await this.tasksService.getTaskWtihFilters(filterDto);
    } else {
      return await this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

  /***** alternate ways 
  @Post()
  createTask(@Body() body) {
    console.log('Body', body);
  }
    ****/
  /************* alt use  
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ):Task {
    //console.log('title', title);
    //console.log('description',description);

    return this.tasksService.createTask(title,description);
  }
******************/

  /******* use dto instead */
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //console.log('title', title);
    //console.log('description',description);

    return this.tasksService.createTask(createTaskDto);
  }
}
