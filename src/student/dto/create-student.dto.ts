import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateStudentDto {
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
  @Field()
  gender: string;
  @Field()
  date_of_birth: Date;
  @Field()
  avatar_url: string;
}
