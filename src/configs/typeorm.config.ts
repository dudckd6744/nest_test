import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
