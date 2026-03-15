import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SkillsService } from './skills.service';

@ApiTags('Skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all skills' })
  async getAllSkills() {
    return this.skillsService.getAllSkills();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get skill by ID' })
  async getSkillById(@Param('id') id: string) {
    return this.skillsService.getSkillById(id);
  }
}
