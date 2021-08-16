import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  // @IsString()
  // @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^.*(?=.*[0-9])(?=.*[a-zA-Z]).*$/, {
    message: 'password only accepts english and number',
  })
  @IsNotEmpty()
  password: string;
}
