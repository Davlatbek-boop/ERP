import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../groups/entities/group.entity";

@ObjectType()
@Entity()
export class Course {
  @Field(()=> ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  duration: number;

  @Field()
  @Column()
  lessontInAWeek: number;

  @Field()
  @Column()
  lessonDuration: number;

  @OneToMany((type)=> Group, (group)=>group.courseId)
  @Field((type)=> [Group])
  group: Group[]
}