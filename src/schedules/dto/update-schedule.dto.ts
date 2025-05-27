import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateScheduleDto {
  @Field()
  groupId?: number;

  @Field()
  dayOfWeek?: string;

  @Field()
  startTime?: Date;

  @Field()
  endTime?: Date;
}
