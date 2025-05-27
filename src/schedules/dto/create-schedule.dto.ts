import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateScheduleDto {
  @Field()
  groupId: number;

  @Field()
  dayOfWeek: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;
}
