import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentGroupDto } from './dto/create-student-group.dto';
import { UpdateStudentGroupDto } from './dto/update-student-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentGroup } from './entities/student-group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentGroupsService {
  constructor(@InjectRepository(StudentGroup) private readonly studentGroupRepo: Repository<StudentGroup>){}
  create(createStudentGroupDto: CreateStudentGroupDto) {
    return this.studentGroupRepo.save(createStudentGroupDto);
  }

  findAll() {
    return this.studentGroupRepo.find();
  }

  findOne(id: number) {
    return this.studentGroupRepo.findOneBy({id});
  }

  async update(id: number, updateStudentGroupDto: UpdateStudentGroupDto) {
    const studentGroup = await this.findOne(id)
    if(!studentGroup){
      throw new BadRequestException("Bunday StudentGroup yo'q")
    }
    const newStudentGroup = this.studentGroupRepo.update(id, updateStudentGroupDto);
    return newStudentGroup
  }

  remove(id: number) {
    this.studentGroupRepo.delete(id)
    return id
  }
}
