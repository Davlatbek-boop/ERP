import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { StudentService } from "../../student/student.service";
import { CreateStudentDto } from "../../student/dto/create-student.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { Student } from "../../student/entities/student.entity";
import { StudentLoginDto } from "./dto/teacher.login-dto";

@Injectable()
export class StudentAuthService {
  constructor(
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService
  ) {}

  async registratsiya(createStudentDto: CreateStudentDto) {
    const student = await this.studentService.findByEmail(
      createStudentDto.email
    );

    if (student) {
      throw new ConflictException("Bunday emailli foydalanuvchi mavjud");
    }

    return await this.studentService.create(createStudentDto);
  }

  async login(studentLoginDto: StudentLoginDto, res: Response) {
    const student = await this.studentService.findByEmail(
      studentLoginDto.email
    );

    if (!student) {
      throw new BadRequestException("Email yoki Parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      studentLoginDto.password,
      student.password
    );

    if (!validPassword) {
      throw new BadRequestException("Email yoki Parol noto'g'ri");
    }

    const tokens = await this.tokensGenerate(student);

    res.cookie("refresh-token-student", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    this.studentService.updateRefreshToken(student.id, hashedRefreshToken);

    return {
      message: "Student logged successfully",
      token: tokens.accessToken,
    };
  }

  async logout(req: Request, res: Response) {
    const cookieRefresh = req.cookies["refresh-token-student"];

    if (!cookieRefresh) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefresh);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const student = await this.studentService.findByEmail(payload.email);

    if (!student) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    res.clearCookie("refresh-token-student", { httpOnly: true });

    this.studentService.clearRefreshToken(student.id);

    return {
      message: "Student logout",
    };
  }

  async refreshToken(req: Request, res: Response) {
    const cookieRefresh = req.cookies["refresh-token-student"];

    if (!cookieRefresh) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefresh);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const student = await this.studentService.findByEmail(payload.email);

    if (!student) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    const tokens = await this.tokensGenerate(student);

    res.cookie("refresh-token-student", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    this.studentService.updateRefreshToken(student.id, hashedRefreshToken);

    return {
      message: "Refresh token yangilandi",
      token: tokens.accessToken,
    };
  }

  async tokensGenerate(student: Student) {
    const payload = {
      id: student.id,
      email: student.email,
      phone: student.phone,
      is_active: student.is_active,
      role: "student",
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
