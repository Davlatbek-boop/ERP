import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCourseDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  duration: number;

  @Field()
  lessontInAWeek: number;

  @Field()
  lessonDuration: number;
}
