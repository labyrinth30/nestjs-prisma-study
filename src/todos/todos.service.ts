import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@prisma/client';
import { PrismaService } from '../prisma.client';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = await this.prismaService.todo.create({
      data: {
        title: createTodoDto.title,
        isDone: createTodoDto.isDone,
      },
    });
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.prismaService.todo.findUnique({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updatedTodo = await this.prismaService.todo.update({
      where: {
        id,
      },
      data: {
        title: updateTodoDto.title,
      },
    });
    return updatedTodo;
  }

  async remove(id: number): Promise<Todo> {
    return this.prismaService.todo.delete({
      where: {
        id,
      },
    });
  }
}
