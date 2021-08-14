import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, password } = createUserDto;
    const user = await this.create({
      name,
      password,
    });

    await this.save(user);

    return user;
  }
}
