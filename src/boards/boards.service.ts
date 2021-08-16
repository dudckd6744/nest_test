import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  createBoard(
    createBoardDto: CreateBoardDto,
    status: BoardStatus,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, status, user);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  async deletedBoard(id: number, user: User): Promise<string> {
    const board = await this.boardRepository.delete({ id, user });

    if (board.affected == 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return 'OK';
  }

  async updateBoardStatus(
    id: number,
    createBoardDto: CreateBoardDto,
    status: BoardStatus,
  ): Promise<Board> {
    const board = await this.getBoardById(id);

    return this.boardRepository.updateBoardStatus(
      board,
      createBoardDto,
      status,
    );
  }
}
