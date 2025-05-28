import { Module } from "@nestjs/common";
import { GradesService } from "./grades.service";
import { GradesController } from "./grades.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Grade } from "./entities/grade.entity";
import { StudentModule } from "../student/student.module";
import { TeacherModule } from "../teacher/teacher.module";
import { HomeworkSubmissionsModule } from "../homework-submissions/homework-submissions.module";

@Module({
  imports: [TypeOrmModule.forFeature([Grade]), StudentModule, TeacherModule, HomeworkSubmissionsModule],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
