import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { HomeworkSubmission } from "../../homework-submissions/entities/homework-submission.entity";
import { Group } from "../../groups/entities/group.entity";
import { Media } from "../../media/entities/media.entity";

@Entity()
export class Homework {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.homework)
  teacher: Teacher;

  @ManyToOne(() => Group, (group) => group.homework)
  group: Group;

  @Column()
  description: string;

  @Column()
  deadline: Date;

  @Column()
  file_url: string;

  @OneToMany(() => HomeworkSubmission, (hsubmission) => hsubmission.homework)
  hsubmission: HomeworkSubmission[];

  @OneToMany(() => Media, (media) => media.homework)
  media: Media[];
}
