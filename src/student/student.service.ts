import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(createStudentDto.password, 7);
    return this.studentRepo.save({
      ...createStudentDto,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.studentRepo.find();
  }

  findOne(id: number) {
    return this.studentRepo.findOneBy({ id });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);
    if (!student) {
      throw new BadRequestException("Student not found");
    }
    const newstudent = await this.studentRepo.update(id, updateStudentDto);
    return newstudent;
  }

  remove(id: number) {
    this.studentRepo.delete(id);
    return id;
  }

  findByEmail(email: string) {
    return this.studentRepo.findOneBy({ email });
  }

  async updateRefreshToken(studentId: number, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 7);
    await this.studentRepo.update(studentId, {
      hashed_refresh_token: hashedToken,
    });
  }

  async clearRefreshToken(studentId: number) {
    await this.studentRepo.update(studentId, {
      hashed_refresh_token: "",
    });
  }
}
