import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../groups/entities/group.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";

@ObjectType()
@Entity()
export class TeacherGroup {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  teacherId: number;

  @Field()
  @Column()
  groupId: number;

  @ManyToOne((type) => Group, (group) => group.teacherGroup)
  @Field((type) => Group)
  group: Group;

  @ManyToOne((type) => Teacher, (teacher) => teacher.teacherGroup)
  @Field((type) => Teacher)
  teacher: Teacher;
}
