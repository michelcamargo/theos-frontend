import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevelopersService } from './developers.service';
import { DevelopersController } from './developers.controller';
import { DeveloperEntity } from './entities/developer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeveloperEntity])],
  providers: [DevelopersService],
  controllers: [DevelopersController],
  exports: [DevelopersService],
})
export class DevelopersModule {}
