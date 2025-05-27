import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { Teacher } from './teacher/entities/teacher.entity';
import { Student } from './student/entities/student.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CoursesModule } from './courses/courses.module';
import { Course } from './courses/entities/course.entity';
import { GroupsModule } from './groups/groups.module';
import { StudentGroupsModule } from './student-groups/student-groups.module';
import { TeacherGroupsModule } from './teacher-groups/teacher-groups.module';
import { SchedulesModule } from './schedules/schedules.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      autoLoadEntities: true,
      entities: [Admin, Teacher, Student, Course],
      synchronize: true, 
    }),
    AdminModule,
    TeacherModule,
    AuthModule,
    StudentModule,
    CoursesModule,
    GroupsModule,
    StudentGroupsModule,
    TeacherGroupsModule,
    SchedulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
