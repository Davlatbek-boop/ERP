import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Student } from './entities/student.entity';

@Resolver('student')
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  
  @Query(()=> [Student])
  findAllStudent() {
    return this.studentService.findAll();
  }

  @Query(()=> Student)
  findOneStudent(@Args('id', {type: ()=> ID}) id: number) {
    return this.studentService.findOne(+id);
  }

  @Mutation(()=>Student)
  createStudent(@Args('createStudent') createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }


  @Mutation(()=> Student)
  updateStudent(@Args('id', {type: ()=> ID}) id: number, @Args('updateStudent') updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Mutation(()=> Number)
  removeStudent(@Args('id', {type: ()=> ID}) id: number) {
    return this.studentService.remove(+id);
  }
}
