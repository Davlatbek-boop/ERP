import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeacherGroup } from "../../teacher-groups/entities/teacher-group.entity";
import { Grade } from "../../grades/entities/grade.entity";
import { Homework } from "../../homework/entities/homework.entity";

@ObjectType()
@Entity()
export class Teacher {
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

  @Field({ defaultValue: true })
  @Column({ default: true })
  is_active: boolean;

  @Field({ defaultValue: "meneger" })
  @Column({ default: "meneger" })
  role: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hashed_refresh_token: string;

  @OneToMany((type) => TeacherGroup, (teacherGroup) => teacherGroup.teacher)
  @Field((type) => TeacherGroup)
  teacherGroup: TeacherGroup;

  @OneToMany(()=>Grade,(grade)=>grade.teacher)
  grade:Grade[]

  @OneToMany(()=>Homework,(homework)=>homework.teacher)
  homework:Homework[]
}
