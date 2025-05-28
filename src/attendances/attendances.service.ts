import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendancesService {
  constructor(@InjectRepository(Attendance) private readonly attendanceRepo: Repository<Attendance>){}
  create(createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceRepo.save(createAttendanceDto)
  }

  findAll() {
    return this.attendanceRepo.find()
  }

  findOne(id: number) {
    return this.attendanceRepo.findOneBy({id})
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceRepo.update(id, updateAttendanceDto)
  }

  remove(id: number) {
    return this.attendanceRepo.delete(id)
  }
}
