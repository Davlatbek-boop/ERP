import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTeacherDto {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field()
  phone: string;
  @Field()
  password: string;
}
