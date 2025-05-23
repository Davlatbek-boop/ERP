import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { CreateTeacherDto } from "../../teacher/dto/create-teacher.dto";
import { Request, Response } from "express";
import { TeacherLoginDto } from "./dto/teacher.login-dto";
import { TeacherAuthService } from "./teacher.auth.service";

@Controller("teacher/auth")
export class TeacherAuthController {
  constructor(private readonly teacherAuthService: TeacherAuthService) {}

  @Post("registratsiya")
  async registratsiya(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherAuthService.registratsiya(createTeacherDto);
  }

  @Post("login")
  async login(
    @Body() teacherLoginDto: TeacherLoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.teacherAuthService.login(teacherLoginDto, res);
  }

  @Get("logout")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.teacherAuthService.logout(req, res);
  }

  @Get("refresh-token")
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.teacherAuthService.refreshToken(req, res);
  }
}
