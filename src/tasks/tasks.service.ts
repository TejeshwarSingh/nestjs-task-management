import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
//import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  //private tasks: Task[] = [];

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
    // return this.tasks;
  }

  getTaskWtihFilters(filterdto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.find();
    /*const { Status, search } = filterdto;

    let tasks = this.getAllTasks();

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    if (Status) {
      tasks = tasks.filter((task) => task.status === Status);
    }

    return tasks;*/
  }

  async getTaskById(id: string): Promise<Task> {
    //const found = await this.taskRepository.  //this.tasks.find((task) => task.id === id);
    //if (!found) {
    //throw new NotFoundException(`Task with id ${id} not found.`);
    //}
    const found = await this.taskRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return found;
  }
/*
  async deleteTask(id: string) {
    const found = await this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;

    return task;
  }
*/
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepository.save(task);

    return task;
  }
}
