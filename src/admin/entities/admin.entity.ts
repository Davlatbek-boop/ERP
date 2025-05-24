import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Admin {
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    firstName: string

    @Field()
    @Column()
    lastName: string

    @Field()
    @Column()
    email: string

    @Field()
    @Column()
    phone: string

    @Field()
    @Column()
    password: string

    @Field({defaultValue: false})
    @Column({default: false})
    is_creator: boolean

    @Field({defaultValue: true})
    @Column({default: true})
    is_active: boolean

    @Field({nullable: true})
    @Column({nullable: true})
    hashed_refresh_token: string
}
