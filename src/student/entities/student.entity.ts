import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Student {
  @Field(()=> ID)
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
}
