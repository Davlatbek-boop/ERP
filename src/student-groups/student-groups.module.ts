import { Module } from '@nestjs/common';
import { StudentGroupsService } from './student-groups.service';
import { StudentGroupsController } from './student-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentGroup } from './entities/student-group.entity';
import { StudentGroupsResolver } from './student-groups.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([StudentGroup])],
  controllers: [StudentGroupsController],
  providers: [StudentGroupsService, StudentGroupsResolver],
})
export class StudentGroupsModule {}
