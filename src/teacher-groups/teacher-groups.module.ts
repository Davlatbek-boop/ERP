import { Module } from '@nestjs/common';
import { TeacherGroupsService } from './teacher-groups.service';
import { TeacherGroupsController } from './teacher-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherGroup } from './entities/teacher-group.entity';
import { TeacherGroupsResolver } from './teacher-groups.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherGroup])],
  controllers: [TeacherGroupsController],
  providers: [TeacherGroupsService, TeacherGroupsResolver],
})
export class TeacherGroupsModule {}
