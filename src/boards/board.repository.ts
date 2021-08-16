import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getAllBoards(): Promise<Board[]> {
    const boards = await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .select([
        'board.id',
        'board.title',
        'board.description',
        'user.id',
        'user.name',
      ])
      .getMany();
    return boards;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    status: BoardStatus,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board_data = await this.create({
      title,
      description,
      status,
      user,
    });
    const test = await this.save(board_data);

    const board = await this.createQueryBuilder('board')
      .where({ id: test.id })
      .leftJoinAndSelect('board.user', 'user')
      .select([
        'board.id',
        'board.title',
        'board.description',
        'user.id',
        'user.name',
      ])
      .getOne();

    return board;
  }

  async updateBoardStatus(
    board,
    createBoardDto: CreateBoardDto,
    status: BoardStatus,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    board.title = title;
    board.description = description;
    board.status = status;

    await this.save(board);

    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .where({ id })
      .select([
        'board.id',
        'board.title',
        'board.description',
        'user.id',
        'user.name',
      ])
      .getOne();

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }
}
