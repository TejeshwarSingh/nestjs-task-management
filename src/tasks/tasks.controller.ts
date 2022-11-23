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
import { TaskStatus } from './task-status.enum';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { get } from 'http';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Console } from 'console';
import { Task } from './task.entity';

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
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  /*
  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string) {
    return await this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return await this.tasksService.updateTaskStatus(id, status);
  }
*/
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
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    //console.log('title', title);
    //console.log('description',description);

    return await this.tasksService.createTask(createTaskDto);
  }
}
