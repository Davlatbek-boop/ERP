
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentGroupDto{
    @Field()
      studentId?: number;
    
      @Field()
      groupId?: number;
    
      @Field()
      period?: Date;
}
