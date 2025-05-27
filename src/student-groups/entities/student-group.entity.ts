import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../../student/entities/student.entity";
import { Group } from "../../groups/entities/group.entity";

@ObjectType()
@Entity()
export class StudentGroup {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  studentId: number;

  @Field()
  @Column()
  groupId: number;

  @Field()
  @Column()
  period: Date;

  @Field({defaultValue: true})
  @Column({default: true})
  is_active: boolean;

  @ManyToOne((type)=> Student, (student)=> student.id)
  @Field((type)=> Student)
  student: Student

  @ManyToOne((type)=> Group, (group)=> group.id)
  @Field((type)=> Group)
  group: Group
}
