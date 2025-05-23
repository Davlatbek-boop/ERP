import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
    return this.adminRepo.save({ ...createAdminDto, password: hashedPassword });
  }

  findAll() {
    return this.adminRepo.find();
  }

  findOne(id: number) {
    return this.adminRepo.findOneBy({ id });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepo.update(id, updateAdminDto);
  }

  remove(id: number) {
    return this.adminRepo.delete(id);
  }

  findByEmail(email: string) {
    return this.adminRepo.findOneBy({ email });
  }

  async updateRefreshToken(adminId: number, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 7);
    await this.adminRepo.update(adminId, {
      hashed_refresh_token: hashedToken,
    });
  }

  async clearRefreshToken(adminId: number) {
    await this.adminRepo.update(adminId, {
      hashed_refresh_token: ""
    });
  }
}
