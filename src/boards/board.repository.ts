import { forwardRef, Inject } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    createBoardDto: CreateBoardDto,
    status: BoardStatus,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = await this.create({
      title,
      description,
      status,
    });

    await this.save(board);

    return board;
  }

  updateBoardStatus(
    board,
    createBoardDto: CreateBoardDto,
    status: BoardStatus,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    board.title = title;
    board.description = description;
    board.status = status;

    this.save(board);

    return board;
  }
}
