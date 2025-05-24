import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { AdminService } from "./admin.service"; 
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";

@ApiTags("Admin") // Swagger bo‘lim nomi
@Resolver("admin")
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Query(()=> [Admin])
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Adminlar ro‘yxati",
    type: [Admin],
  })
  findAllAdmins() {
    return this.adminService.findAll();
  }

  @Query(()=> Admin)
  @ApiOperation({ summary: "ID bo‘yicha adminni olish" })
  @ApiParam({ name: "id", type: Number, description: "Admin ID" })
  @ApiResponse({ status: 200, description: "Topilgan admin", type: Admin })
  findOneAdmin(@Args("id", {type: ()=>ID}) id: number) {
    return this.adminService.findOne(+id);
  }

  @Mutation(()=> Admin)
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 201, description: "Admin yaratildi", type: Admin })
  createAdmin(@Args('createAdmin') createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Mutation(()=> Admin)
  @ApiOperation({ summary: "Admin ma’lumotlarini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Admin ID" })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({ status: 200, description: "Admin yangilandi", type: Admin })
  updateAdmin(@Args("id", {type: ()=>ID}) id: number, @Args('updateAdmin') updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Mutation(()=> Number)
  @ApiOperation({ summary: "Adminni o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Admin ID" })
  @ApiResponse({ status: 200, description: "Admin o‘chirildi" })
  removeAdmin(@Args("id", {type: ()=> ID}) id: number) {
    return this.adminService.remove(id);
  }
}
