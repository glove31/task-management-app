import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';


@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search} = filterDto;
        let tasks = this.getAllTasks();

        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if(search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }

    getTaskById(id: string): Task {

        const found = this.tasks.find(task => task.id === id);

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title,description} = createTaskDto
        const task: Task = {
            id: uuid(),
            title, // or title: title, we can see that is the same cause it have the same key, and abject name use to define the value 
            description, // or description: description,
            status: TaskStatus.OPEN, 
        };

        this.tasks.push(task);
        return task;
    }

    updateTask(id: string, updateTaskDto: CreateTaskDto): Task {
        const {title,description} = updateTaskDto;
        const tasks = this.getTaskById(id);
        tasks.title = title;
        tasks.description = description;

        return tasks;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    deleteTaskById(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    } 
}
