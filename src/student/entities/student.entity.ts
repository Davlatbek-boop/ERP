import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentGroup } from "../../student-groups/entities/student-group.entity";
import { Attendance } from "../../attendances/entities/attendance.entity";
import { Grade } from "../../grades/entities/grade.entity";
import { HomeworkSubmission } from "../../homework-submissions/entities/homework-submission.entity";

@ObjectType()
@Entity()
export class Student {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  password: string;

  @Field({ defaultValue: "another" })
  @Column({ default: "another" })
  gender: string;

  @Field()
  @Column()
  date_of_birth: Date;

  @Field({ defaultValue: "" })
  @Column({ default: "" })
  avatar_url: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  is_active: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hashed_refresh_token: string;

  @OneToMany((type) => StudentGroup, (studentGroup) => studentGroup.student)
  @Field((type) => StudentGroup)
  studentGroup: StudentGroup;

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendance: Attendance[];

  @OneToMany(() => HomeworkSubmission, (hsubmission) => hsubmission.student)
  hsubmission: HomeworkSubmission[];

  @OneToMany(() => Grade, (grade) => grade.student)
  grade: Grade[];
}
