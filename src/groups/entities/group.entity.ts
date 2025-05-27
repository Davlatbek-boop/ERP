import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../../courses/entities/course.entity";
import { Student } from "../../student/entities/student.entity";
import { StudentGroup } from "../../student-groups/entities/student-group.entity";
import { TeacherGroup } from "../../teacher-groups/entities/teacher-group.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";

@ObjectType()
@Entity()
export class Group {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    courseId: number

    @Field()
    @Column()
    startDate: Date

    @Field()
    @Column()
    endDate: Date

    @Field()
    @Column()
    status: string

    @ManyToOne((type)=> Course, (course)=>course.group)
    @Field((type)=> Course)
    course: Course

    @OneToMany((type)=> StudentGroup, (studentGroup)=> studentGroup.group)
    @Field((type) => StudentGroup)
    studentGroup: StudentGroup[]

    @OneToMany((type)=> TeacherGroup, (teacherGroup)=> teacherGroup.group)
    @Field((type) => TeacherGroup)
    teacherGroup: TeacherGroup[]

    @OneToMany((type)=> Schedule, (schedule)=>schedule.group)
    @Field((type)=> Schedule)
    schedule: Schedule[]
}
