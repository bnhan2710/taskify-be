export interface INewBoard{
    name:string
}

export function NewBoardDTO(body:any): INewBoard{
    return {
        name: body.name
    }
}