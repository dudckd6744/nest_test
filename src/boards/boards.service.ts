import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  createBoard(
    createBoardDto: CreateBoardDto,
    status: BoardStatus,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, status);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async deletedBoard(id: number): Promise<string> {
    const board = await this.boardRepository.delete(id);

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
