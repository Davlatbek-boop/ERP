import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Student } from "../../student/entities/student.entity";
import { HomeworkSubmission } from "../../homework-submissions/entities/homework-submission.entity";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.grade)
  student: Student;

  @ManyToOne(() => HomeworkSubmission, (hsubmission) => hsubmission.grade)
  hsubmission: HomeworkSubmission;

  @ManyToOne(() => Teacher, (teacher) => teacher.grade)
  teacher: Teacher;

  @Column()
  grade: number;

  @Column()
  date: Date;

  @Column()
  comment: string;
}
