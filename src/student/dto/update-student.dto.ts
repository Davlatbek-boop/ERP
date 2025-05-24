import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateStudentDto {
  @Field({nullable: true})
  firstName?: string;
  @Field({nullable: true})
  lastName?: string;
  @Field({nullable: true})
  email?: string;
  @Field({nullable: true})
  phone?: string;
  @Field({nullable: true})
  password?: string;
  @Field({nullable: true})
  gender?: string;
  @Field({nullable: true})
  date_of_birth?: Date;
  @Field({nullable: true})
  avatar_url?: string;
}
