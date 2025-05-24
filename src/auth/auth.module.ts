import { Module } from "@nestjs/common";
import { AdminModule } from "../admin/admin.module";
import { AdminAuthService } from "./auth.admin/admin.auth.service";
import { AdminAuthController } from "./auth.admin/admin.auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { TeacherAuthController } from "./auth.teacher/teacher.auth.controller";
import { TeacherAuthService } from "./auth.teacher/teacher.auth.service";
import { TeacherModule } from "../teacher/teacher.module";
import { StudentModule } from "../student/student.module";
import { StudentAuthController } from "./auth.student/teacher.auth.controller";
import { StudentAuthService } from "./auth.student/teacher.auth.service";
import { AdminAuthResolver } from "./auth.admin/admin.auth.resolver";

@Module({
  imports: [JwtModule.register({ global: true }), AdminModule, TeacherModule, StudentModule],
  controllers: [AdminAuthController, TeacherAuthController, StudentAuthController],
  providers: [AdminAuthService, TeacherAuthService, StudentAuthService, AdminAuthResolver],
})
export class AuthModule {}
