import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AdminService } from "../../admin/admin.service";
import { CreateAdminDto } from "../../admin/dto/create-admin.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AdminLoginDto } from "./dto/admin.login-dto";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../../admin/entities/admin.entity";

@Injectable()
export class AdminAuthService {
  constructor(private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  async registratsiya(createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.findByEmail(createAdminDto.email);

    if (admin) {
      throw new ConflictException("Bunday emailli foydalanuvchi mavjud");
    }

    return await this.adminService.create(createAdminDto);
  }


  async login(adminLoginDto: AdminLoginDto, res: Response){
    const admin = await this.adminService.findByEmail(adminLoginDto.email);

    if (!admin) {
      throw new BadRequestException("Email yoki Parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(adminLoginDto.password, admin.password)

    if(!validPassword){
      throw new BadRequestException("Email yoki Parol noto'g'ri");
    }

    const tokens = await this.tokensGenerate(admin);

    res.cookie('refresh-token-admin', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7)

    this.adminService.updateRefreshToken(admin.id, hashedRefreshToken)


    return {
        message: "Admin logged successfully",
        token: tokens.accessToken
    }
  }



  async logout(req: Request ,res: Response){
    const cookieRefresh = req.cookies['refresh-token-admin'];

    if (!cookieRefresh) {
      throw new UnauthorizedException('Cookie da refresh token topilmadi');
    }

    const payload = await this.jwtService.decode(cookieRefresh);

    if (!payload) {
      throw new UnauthorizedException('Refresh token xato');
    }

    const admin = await this.adminService.findByEmail(payload.email)

    if (!admin) {
      throw new BadRequestException(
        'Bunday refresh tokenli foydalanuvchi topilmadi',
      );
    }

    res.clearCookie('refresh-token-admin', { httpOnly: true });

    this.adminService.clearRefreshToken(admin.id)

    return {
        message: "Admin logout"
    }
  }



  async refreshToken(req: Request, res: Response){
    const cookieRefresh = req.cookies['refresh-token-admin'];

    if (!cookieRefresh) {
      throw new UnauthorizedException('Cookie da refresh token topilmadi');
    }

    const payload = await this.jwtService.decode(cookieRefresh);

    if (!payload) {
      throw new UnauthorizedException('Refresh token xato');
    }

    const admin = await this.adminService.findByEmail(payload.email)

    if (!admin) {
      throw new BadRequestException(
        'Bunday refresh tokenli foydalanuvchi topilmadi',
      );
    }

    const tokens = await this.tokensGenerate(admin);

    res.cookie('refresh-token-admin', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7)

    this.adminService.updateRefreshToken(admin.id, hashedRefreshToken)


    return {
        message: "Refresh token yangilandi",
        token: tokens.accessToken
    }
  }


   async tokensGenerate(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      phone: admin.phone,
      is_active: admin.is_active,
      role: 'admin',
    };

    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });

    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
