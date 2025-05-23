import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({unique: true})
    email: string

    @Column()
    phone: string

    @Column()
    password: string

    @Column({default: false})
    is_creator: boolean

    @Column({default: true})
    is_active: boolean

    @Column({nullable: true})
    hashed_refresh_token: string
}
