import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AdminAuthService } from "./admin.auth.service";
import { CreateAdminDto } from "../../admin/dto/create-admin.dto";
import { Request, Response } from "express";
import { AdminLoginDto } from "./dto/admin.login-dto";

@Controller("admin/auth")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("registratsiya")
  async registratsiya(@Body() createAdminDto: CreateAdminDto) {
    return this.adminAuthService.registratsiya(createAdminDto);
  }

  @Post("login")
  async login(
    @Body() adminLoginDto: AdminLoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.login(adminLoginDto, res);
  }

  @Get("logout")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.adminAuthService.logout(req, res);
  }

  @Get("refresh-token")
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.refreshToken(req, res);
  }
}
