import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>
  ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    const hashedPassword = await bcrypt.hash(createTeacherDto.password, 7)
    return this.teacherRepo.save({...createTeacherDto, password: hashedPassword})
  }

  findAll() {
    return this.teacherRepo.find();
  }

  findOne(id: number) {
    return this.teacherRepo.findOneBy({id});
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepo.update(id, updateTeacherDto);
  }

  remove(id: number) {
    return this.teacherRepo.delete(id);
  }

  findByEmail(email: string) {
    return this.teacherRepo.findOneBy({ email });
  }

   async updateRefreshToken(adminId: number, refreshToken: string) {
      const hashedToken = await bcrypt.hash(refreshToken, 7);
      await this.teacherRepo.update(adminId, {
        hashed_refresh_token: hashedToken,
      });
    }
  
    async clearRefreshToken(adminId: number) {
      await this.teacherRepo.update(adminId, {
        hashed_refresh_token: ""
      });
    }
}
