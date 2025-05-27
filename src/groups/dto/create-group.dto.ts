import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateGroupDto {
  @Field()
  name: string;

  @Field()
  courseId: number;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  status: string;
}
