import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateGroupDto {
  @Field()
  name?: string;

  @Field()
  courseId?: number;

  @Field()
  startDate?: Date;

  @Field()
  endDate?: Date;

  @Field()
  status?: string;
}
