import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateTeacherGroupDto {
  @Field()
  teacherId?: number;

  @Field()
  groupId?: number;
}
