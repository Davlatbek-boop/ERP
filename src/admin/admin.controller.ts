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

@ApiTags("Admin") // Swagger bo‘lim nomi
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 201, description: "Admin yaratildi", type: Admin })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Adminlar ro‘yxati",
    type: [Admin],
  })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha adminni olish" })
  @ApiParam({ name: "id", type: Number, description: "Admin ID" })
  @ApiResponse({ status: 200, description: "Topilgan admin", type: Admin })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Admin ma’lumotlarini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Admin ID" })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({ status: 200, description: "Admin yangilandi", type: Admin })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Adminni o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Admin ID" })
  @ApiResponse({ status: 200, description: "Admin o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
