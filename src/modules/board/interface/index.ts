import { Workspace } from "../../../database/entities/Workspace"
import { Board } from "../../../database/entities/Board"

export interface ICreateBoard{
    title: string,
    description?: string,
    workspaceId: string
    type: string
}

export interface IUpdateBoard{
    title?: string
    description?: string
    listOrderIds?: string[]
}

export type ListBoard = {
    boards: Board[],
    totalBoards: number
}

export interface IBoardService{
    newBoard (newBoardDto: ICreateBoard, userId: string): Promise<string>;
    getMyBoards(userId: string,qs: any): Promise<ListBoard>;
    getBoardById(boardId: string): Promise<any>;
    updateBoard(updateBoardDto:IUpdateBoard, boardId:string): Promise<void>;
    removeBoard(boardId:string): Promise<any>;
    inviteMember(boardId: string, userEmail: string): Promise<any>;
}

export interface IBoardRepository {
    insert(newBoardDto: ICreateBoard , workspace: Workspace): Promise<string>;
    getMyBoard(userId:string,qs: any) : Promise<ListBoard>;
    getBoardDetail(boardId:string): Promise<Board | null>;
    findById(boardId: string): Promise<Board | null>;
    update(updateBoardDto: IUpdateBoard, boardId: string): Promise<void>;
    detele(board: Board): Promise<void>;   
} 