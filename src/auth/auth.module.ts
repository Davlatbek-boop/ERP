import { Module } from "@nestjs/common";
import { AdminModule } from "../admin/admin.module";
import { AdminAuthService } from "./auth.admin/admin.auth.service";
import { AdminAuthController } from "./auth.admin/admin.auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { TeacherAuthController } from "./auth.teacher/teacher.auth.controller";
import { TeacherAuthService } from "./auth.teacher/teacher.auth.service";
import { TeacherModule } from "../teacher/teacher.module";

@Module({
  imports: [JwtModule.register({ global: true }), AdminModule, TeacherModule],
  controllers: [AdminAuthController, TeacherAuthController],
  providers: [AdminAuthService, TeacherAuthService],
})
export class AuthModule {}
