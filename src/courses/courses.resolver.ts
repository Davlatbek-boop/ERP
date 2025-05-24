
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Course } from "./entities/course.entity";

@Resolver("courses")
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Query(()=> [Course])
  findAllCourse() {
    return this.coursesService.findAll();
  }

  @Query(()=> Course)
  findOneCourse(@Args("id") id: string) {
    return this.coursesService.findOne(+id);
  }

  @Mutation(()=> Course)
  createCourse(@Args('createCoruse') createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Mutation(()=> Course)
  updateCourse(@Args("id") id: string, @Args('updateCoruse') updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Mutation(()=> Number)
  removeCourse(@Args("id") id: string) {
    return this.coursesService.remove(+id);
  }
}
