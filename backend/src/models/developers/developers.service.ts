import { Injectable } from '@nestjs/common';
import { DeveloperEntity } from './entities/developer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(DeveloperEntity)
    private readonly userRepository: Repository<DeveloperEntity>,
  ) {}
  
  async storeDeveloper(developer: any) {
    return this.userRepository.save(developer);
  }
  
  async getAll() {
    return this.userRepository.find();
  }
}
