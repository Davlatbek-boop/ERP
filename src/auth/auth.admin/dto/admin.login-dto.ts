import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AdminLoginDto {
  @Field()
  email: string;
  @Field()
  password: string;
}
