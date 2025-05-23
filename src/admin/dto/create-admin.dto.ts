import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ example: 'Ali', description: 'Adminning ismi' })
  firstName: string;

  @ApiProperty({ example: 'Valiyev', description: 'Adminning familiyasi' })
  lastName: string;

  @ApiProperty({ example: 'ali@example.com', description: 'Yagona email manzili' })
  email: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  phone: string;

  @ApiProperty({ example: 'StrongP@ssw0rd', description: 'Kiritiladigan parol' })
  password: string;
}