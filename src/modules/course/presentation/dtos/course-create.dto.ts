import { Allow, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CourseCreateDto {
  @Allow()
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title: string;

  @Allow()
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  slug: string;
}
