import { Controller, Post, Body, UseGuards, Get } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { JwtAuthDto } from "./dto/jwt-auth.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse(
    {
      description: 'Successfully authenticated',
    }
  )
  @ApiBadRequestResponse(
    {
      description: 'Unauthorized'
    }
  )
  @Post()
  async login(@Body() jwtAuthDto:JwtAuthDto){
    return this.authService.login(jwtAuthDto);
  }

  @ApiOkResponse(
    {
      description: 'Successfully authenticated and access to protected route',
      type: 'string'
    }
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Hello World with Jwt';
  }
}
