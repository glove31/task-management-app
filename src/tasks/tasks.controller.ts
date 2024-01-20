import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor (private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[]{
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body('title') title: string, @Body('description') description: string): Task{ 
        // the second way is to define as createTask(@Body() body) where we shall get all data whereas what we are using permit us to extract specific data
       return this.tasksService.createTask(title,description);
    }


}
