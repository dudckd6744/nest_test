import {
    Body,
    Controller,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUser } from "./get-user.decorator";
import { User } from "./user.entity";

@Controller("auth")
export class AuthController {
    // private logger = new logger('User')
    constructor(private authService: AuthService) {}

    @Post("/signup")
    @UsePipes(ValidationPipe)
    createUser(
        @Body()
        createUserDto: CreateUserDto,
    ): Promise<User> {
        return this.authService.createUser(createUserDto);
    }

    @Post("/login")
    @UsePipes(ValidationPipe)
    signUP(
        @Body()
        createUserDto: CreateUserDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.singUp(createUserDto);
    }

    @Post("/test")
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        return user;
    }
}
