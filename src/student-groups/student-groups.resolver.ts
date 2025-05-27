
import { StudentGroupsService } from "./student-groups.service";
import { CreateStudentGroupDto } from "./dto/create-student-group.dto";
import { UpdateStudentGroupDto } from "./dto/update-student-group.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { StudentGroup } from "./entities/student-group.entity";

@Resolver("student-groups")
export class StudentGroupsResolver {
  constructor(private readonly studentGroupsService: StudentGroupsService) {}

  @Query(() => [StudentGroup])
  findAllStudentGroup() {
    return this.studentGroupsService.findAll();
  }

  @Query(() => StudentGroup)
  findOneStudentGroup(@Args("id", { type: () => ID }) id: number) {
    return this.studentGroupsService.findOne(+id);
  }

  @Mutation(() => StudentGroup)
  createStudentGroup(
    @Args("createStudentGroup") createStudentGroupDto: CreateStudentGroupDto
  ) {
    return this.studentGroupsService.create(createStudentGroupDto);
  }

  @Mutation(() => StudentGroup)
  updateStudentGroup(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateStudentGroup") updateStudentGroupDto: UpdateStudentGroupDto
  ) {
    return this.studentGroupsService.update(+id, updateStudentGroupDto);
  }

  @Mutation(() => Number)
  removeStudentGroup(@Args("id", { type: () => ID }) id: number) {
    return this.studentGroupsService.remove(+id);
  }
}