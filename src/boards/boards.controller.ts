/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, status);
  }

  @Get('/:id')
  getBoardById(
    @Param('id', ParseIntPipe) id: number
    ): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deletedBoard(
    @Param('id', ParseIntPipe) id: number
    ): Promise<string> {
    return this.boardsService.deletedBoard(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBoardDto: CreateBoardDto,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, createBoardDto, status);
  }
}
