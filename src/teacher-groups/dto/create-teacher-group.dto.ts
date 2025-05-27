import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTeacherGroupDto {
  @Field()
  teacherId: number;

  @Field()
  groupId: number;
}
