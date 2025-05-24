import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { CreateStudentDto } from "../../student/dto/create-student.dto";
import { Request, Response } from "express";
import { StudentLoginDto } from "./dto/teacher.login-dto";
import { StudentAuthService } from "./teacher.auth.service";

@Controller("student/auth")
export class StudentAuthController {
  constructor(private readonly studentAuthService: StudentAuthService) {}

  @Post("registratsiya")
  async registratsiya(@Body() createStudentDto: CreateStudentDto) {
    return this.studentAuthService.registratsiya(createStudentDto);
  }

  @Post("login")
  async login(
    @Body() studentLoginDto: StudentLoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.studentAuthService.login(studentLoginDto, res);
  }

  @Get("logout")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.studentAuthService.logout(req, res);
  }

  @Get("refresh-token")
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.studentAuthService.refreshToken(req, res);
  }
}
