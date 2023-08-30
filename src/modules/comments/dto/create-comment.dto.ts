import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNumber()
    userId: number

    @IsString()
    description: String

    @IsNumber()
    publishId: number
}
