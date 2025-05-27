import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Repository } from "typeorm";

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>
  ) {}
  create(createGroupDto: CreateGroupDto) {
    return this.groupRepo.save(createGroupDto);
  }

  findAll() {
    return this.groupRepo.find();
  }

  findOne(id: number) {
    return this.groupRepo.findOneBy({ id });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id);
    if (!group) {
      throw new BadRequestException("Group topilmadi");
    }
    const newGroup = await this.groupRepo.update(id, updateGroupDto);
    return newGroup;
  }

  remove(id: number) {
    this.groupRepo.delete(id);
    return id
  }
}
