import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchedulesService {
  constructor(@InjectRepository(Schedule) private readonly shceduleRepo: Repository<Schedule>){}
  create(createScheduleDto: CreateScheduleDto) {
    return this.shceduleRepo.save(createScheduleDto)
  }

  findAll() {
    return this.shceduleRepo.find()
  }

  findOne(id: number) {
    return this.shceduleRepo.findOneBy({id})
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.findOne(id)
    if(!schedule){
      throw new BadRequestException("Schedule topilmadi")
    }
    const newSchedule = await this.shceduleRepo.update(id, updateScheduleDto)
    return newSchedule
  }

  async remove(id: number) {
    const schedule = await this.findOne(id)
    if(!schedule){
      throw new BadRequestException("Schedule topilmadi")
    }
    await this.shceduleRepo.delete(id)
    return id
  }
}
