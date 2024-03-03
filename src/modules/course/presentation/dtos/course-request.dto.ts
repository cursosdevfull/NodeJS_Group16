import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CourseRequestDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  slug: string;
}
