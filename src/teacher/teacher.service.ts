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

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.findOne(id)
    if(!teacher){
      throw new BadRequestException("Teacher topilmadi")
    }

    const newTeacher = await this.teacherRepo.update(id, updateTeacherDto);
    return newTeacher
  }

  remove(id: number) {
    this.teacherRepo.delete(id);
    return id
  }

  findByEmail(email: string) {
    return this.teacherRepo.findOneBy({ email });
  }

   async updateRefreshToken(teacherId: number, refreshToken: string) {
      const hashedToken = await bcrypt.hash(refreshToken, 7);
      await this.teacherRepo.update(teacherId, {
        hashed_refresh_token: hashedToken,
      });
    }
  
    async clearRefreshToken(teacherId: number) {
      await this.teacherRepo.update(teacherId, {
        hashed_refresh_token: ""
      });
    }
}
