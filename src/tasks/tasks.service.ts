import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';


@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string): Task {
        const task: Task = {
            id: uuid(),
            title, // or title: title, we can see that is the same cause it have the same key, and abject name use to define the value 
            description, // or description: description,
            status: TaskStatus.OPEN, 
        };

        this.tasks.push(task);
        return task;
    }
}
