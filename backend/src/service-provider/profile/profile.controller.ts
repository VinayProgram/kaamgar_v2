import { Controller, Get, Post, Body, UsePipes, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { UpdateProfileDto, UpdateProfileSchema } from './dto/update-profile.dto';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@ApiTags('Service Provider Profile')
@Controller('service-provider/profile')
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  @ApiOperation({ summary: 'Get service provider profile' })
  async getProfile(@Request() req) {
    return this.profileService.getProfile(req.user.sub);
  }

  @Post()
  @ApiOperation({ summary: 'Update service provider profile' })
  @UsePipes(new ZodValidationPipe(UpdateProfileSchema))
  async updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(req.user.sub, dto);
  }
}
