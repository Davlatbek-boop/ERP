import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homework } from './entities/homework.entity';
import { TeacherModule } from '../teacher/teacher.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([Homework]), TeacherModule, GroupsModule],
  controllers: [HomeworkController],
  providers: [HomeworkService],
  exports: [HomeworkService]
})
export class HomeworkModule {}
