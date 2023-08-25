import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Request
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsService } from './publications.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtauthGuard } from '../auth/jst-auth.guard';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
    @UseGuards(JwtauthGuard)
    @ApiBearerAuth()
  create(@Body() createPublicationDto: CreatePublicationDto, @Request() req) {
    console.log('######################',req.user)
    return this.publicationsService.create(createPublicationDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.publicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ) {
    return this.publicationsService.update(id, updatePublicationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.remove(id);
  }
}
