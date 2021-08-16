/* eslint-disable prettier/prettier */
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hasy_password = await bcrypt.hash(password, salt);

    const user = await this.create({
      name,
      password: hasy_password,
    });

    try {
        await this.save(user);
    } catch(err){
        if(err.errno == 1062){
            throw new ConflictException('Existing username');
        }else{
            throw new InternalServerErrorException();
        }
    }
    
    return user;
  }
}
