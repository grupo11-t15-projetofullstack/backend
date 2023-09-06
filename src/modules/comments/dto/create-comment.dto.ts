import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {

    @IsString()
    description: String

    @IsNumber()
    publishId: number
}
