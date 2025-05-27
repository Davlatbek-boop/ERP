import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherGroupDto } from './dto/create-teacher-group.dto';
import { UpdateTeacherGroupDto } from './dto/update-teacher-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherGroup } from './entities/teacher-group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherGroupsService {
  constructor(@InjectRepository(TeacherGroup) private readonly teacherGroupRepo: Repository<TeacherGroup>){}
  create(createTeacherGroupDto: CreateTeacherGroupDto) {
    return this.teacherGroupRepo.save(createTeacherGroupDto)
  }

  findAll() {
    return this.teacherGroupRepo.find()
  }

  findOne(id: number) {
    return this.teacherGroupRepo.findOneBy({id})
  }

  async update(id: number, updateTeacherGroupDto: UpdateTeacherGroupDto) {
    const teacherGroup = await this.findOne(id)
    if(!teacherGroup){
      throw new BadRequestException("Bunday TeacherGroup yo'q")
    }
    const newTeacherGroup = await  this.teacherGroupRepo.update(id, updateTeacherGroupDto)
    return newTeacherGroup
  }

  async remove(id: number) {
    const teacherGroup = await this.findOne(id)
    if(!teacherGroup){
      throw new BadRequestException("Bunday TeacherGroup yo'q")
    }
    this.teacherGroupRepo.delete(id)
    return id
  }
}
