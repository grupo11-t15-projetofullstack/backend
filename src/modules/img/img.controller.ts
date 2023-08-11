/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post,} from '@nestjs/common';
import { ImgService } from './img.service';
import CreateImgDto from './dto/create-img.dto';
import UpdateImgDto from './dto/update-img.dto';

@Controller('images')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @Post()
  create(@Body() createImgDto: CreateImgDto) {
    return this.imgService.create(createImgDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() updateimgDto: UpdateImgDto,
  ) {
    return this.imgService.update(id, updateimgDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: number) {
    return this.imgService.remove(id);
  }
}
