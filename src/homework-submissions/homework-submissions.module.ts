import { Module } from '@nestjs/common';
import { HomeworkSubmissionsService } from './homework-submissions.service';
import { HomeworkSubmissionsController } from './homework-submissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeworkSubmission } from './entities/homework-submission.entity';
import { HomeworkModule } from '../homework/homework.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports:[TypeOrmModule.forFeature([HomeworkSubmission]), StudentModule],
  controllers: [HomeworkSubmissionsController],
  providers: [HomeworkSubmissionsService],
  exports: [HomeworkSubmissionsService]
})
export class HomeworkSubmissionsModule {}
