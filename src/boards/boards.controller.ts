/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  private logger = new Logger('BoardsController')
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  createBoard(
    @GetUser() user: User,
    @Body() createBoardDto: CreateBoardDto,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    this.logger.verbose(`User ${user.name} creating a new board payload: ${JSON.stringify(createBoardDto)}`)
    return this.boardsService.createBoard(createBoardDto, status, user);
  }

  @Get('/:id')
  getBoardById(
    @Param('id', ParseIntPipe) id: number
    ): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deletedBoard(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number
    ): Promise<string> {
    return this.boardsService.deletedBoard(id, user);
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
