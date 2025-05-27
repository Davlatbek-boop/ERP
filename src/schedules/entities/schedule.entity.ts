import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../groups/entities/group.entity";

@ObjectType()
@Entity()
export class Schedule {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  groupId: number;

  @Field()
  @Column()
  dayOfWeek: string;

  @Field()
  @Column()
  startTime: Date;

  @Field()
  @Column()
  endTime: Date;

  @ManyToOne((type)=>Group, (group)=> group.schedule)
  @Field((type)=>Group)
  group: Group
}