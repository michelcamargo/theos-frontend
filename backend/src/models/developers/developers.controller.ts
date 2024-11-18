import {Controller, Post, Body, Get} from '@nestjs/common';
import { DevelopersService } from './developers.service';
import {CreateDeveloperDto} from "./dto/create-developer.dto";

@Controller('users')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get()
  async getDevelopers() {
    try {
      return await this.developersService.getAll();
    } catch (err) {
      console.error('Falha ao buscar usuário >>>', err);
      return {
        err: 'Falha ao buscar usuário',
      };
    }
  }
  
  @Post()
  async storeDeveloper(@Body() developer: CreateDeveloperDto) {
    try {
      return await this.developersService.storeDeveloper(developer);
    } catch (err) {
      console.error('Falha ao salvar usuário >>>', err);
      return {
        err: 'Falha ao salvar usuário',
      };
    }
  }
}
