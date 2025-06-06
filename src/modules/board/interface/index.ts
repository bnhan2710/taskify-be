import { Workspace } from '../../../database/entities/Workspace';
import { Board } from '../../../database/entities/Board';
export interface ICreateBoard {
  title: string;
  description?: string;
  cover?: string;
  workspaceId: string;
  type: string;
}

export interface IUpdateBoard {
  title?: string;
  description?: string;
  listOrderIds?: string[];
  type?: string;
}

export interface IInviteMember {
  email: string;
  roleName: string;
}

export interface ListBoard {
  boards: Board[];
  totalBoards: number;
}

export interface BoardDetail {
  board: Board[];
  boardUsers: any;
}

export interface IBoardService {
  newBoard(newBoardDto: ICreateBoard, userId: string): Promise<string>;
  getMyBoards(userId: string, qs: any): Promise<ListBoard>;
  getPublicBoard(qs: any): Promise<ListBoard>;
  searchBoards(userId: string, qs: any): Promise<ListBoard>;
  getBoardById(boardId: string): Promise<BoardDetail>;
  getClosedBoard(userId: string): Promise<ListBoard>;
  updateBoard(updateBoardDto: IUpdateBoard, boardId: string): Promise<void>;
  removeBoard(boardId: string): Promise<void>;
  inviteMember(boardId: string, inviteMemberDto: IInviteMember): Promise<any>;
  closeBoard(boardId: string): Promise<void>;
  reopenBoard(boardId: string): Promise<void>;
}

export interface IBoardRepository {
  insert(newBoardDto: ICreateBoard, workspace: Workspace): Promise<string>;
  getMyBoard(userId: string, qs: any): Promise<ListBoard>;
  getPublicBoard(qs: any): Promise<ListBoard>;
  searchBoards(userId: string, qs: any): Promise<ListBoard>;
  getBoardDetail(boardId: string): Promise<Board | null>;
  getClosedBoard(userId: string, qs: any): Promise<ListBoard>;
  findById(boardId: string): Promise<Board | null>;
  update(updateBoardDto: IUpdateBoard, boardId: string): Promise<void>;
  detele(board: Board): Promise<void>;
  closeBoard(boardId: string): Promise<void>;
  reopenBoard(boardId: string): Promise<void>;
}
