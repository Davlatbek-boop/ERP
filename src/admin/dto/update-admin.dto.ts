import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateAdminDto {
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  phone?: string;
  @Field({ nullable: true })
  password?: string;
}
