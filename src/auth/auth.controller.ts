import { Controller, Post, Body, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthDto } from "./dto/jwt-auth.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() jwtAuthDto:JwtAuthDto){
    return this.authService.login(jwtAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Hello World with Jwt';
  }
}
