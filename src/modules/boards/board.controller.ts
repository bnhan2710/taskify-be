import { Request,Response ,NextFunction } from "express";
import { Board } from "src/orm/entities/Board";
import { OK, CREATED } from "../../handler/success.reponse";
import boardService from "./board.service";

class BoardController{ 
    public async newBoard(req: Request, res: Response , next: NextFunction){
    }
}
export default new BoardController()