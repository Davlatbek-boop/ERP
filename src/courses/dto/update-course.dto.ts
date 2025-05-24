import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCourseDto {
  @Field({nullable: true})
  title?: string;

  @Field({nullable: true})
  description?: string;

  @Field({nullable: true})
  price?: number;

  @Field({nullable: true})
  duration?: number;

  @Field({nullable: true})
  lessontInAWeek?: number;

  @Field({nullable: true})
  lessonDuration?: number;
}
