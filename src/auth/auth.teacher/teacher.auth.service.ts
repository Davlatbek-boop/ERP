import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { TeacherService } from "../../teacher/teacher.service";
import { CreateTeacherDto } from "../../teacher/dto/create-teacher.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { TeacherLoginDto } from "./dto/teacher.login-dto";

@Injectable()
export class TeacherAuthService {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly jwtService: JwtService
  ) {}

  async registratsiya(createTeacherDto: CreateTeacherDto) {
    const teacher = await this.teacherService.findByEmail(
      createTeacherDto.email
    );

    if (teacher) {
      throw new ConflictException("Bunday emailli foydalanuvchi mavjud");
    }

    return await this.teacherService.create(createTeacherDto);
  }

  async login(teacherLoginDto: TeacherLoginDto, res: Response) {
    const teacher = await this.teacherService.findByEmail(
      teacherLoginDto.email
    );

    if (!teacher) {
      throw new BadRequestException("Email yoki Parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      teacherLoginDto.password,
      teacher.password
    );

    if (!validPassword) {
      throw new BadRequestException("Email yoki Parol noto'g'ri");
    }

    const tokens = await this.tokensGenerate(teacher);

    res.cookie("refresh-token-teacher", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    this.teacherService.updateRefreshToken(teacher.id, hashedRefreshToken);

    return {
      message: "Teacher logged successfully",
      token: tokens.accessToken,
    };
  }

  async logout(req: Request, res: Response) {
    const cookieRefresh = req.cookies["refresh-token-teacher"];

    if (!cookieRefresh) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefresh);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const teacher = await this.teacherService.findByEmail(payload.email);

    if (!teacher) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    res.clearCookie("refresh-token-teacher", { httpOnly: true });

    this.teacherService.clearRefreshToken(teacher.id);

    return {
      message: "Teacher logout",
    };
  }

  async refreshToken(req: Request, res: Response) {
    const cookieRefresh = req.cookies["refresh-token-teacher"];

    if (!cookieRefresh) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefresh);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const teacher = await this.teacherService.findByEmail(payload.email);

    if (!teacher) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    const tokens = await this.tokensGenerate(teacher);

    res.cookie("refresh-token-teacher", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    this.teacherService.updateRefreshToken(teacher.id, hashedRefreshToken);

    return {
      message: "Refresh token yangilandi",
      token: tokens.accessToken,
    };
  }

  async tokensGenerate(teacher: Teacher) {
    const payload = {
      id: teacher.id,
      email: teacher.email,
      phone: teacher.phone,
      is_active: teacher.is_active,
      role: "teacher",
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
