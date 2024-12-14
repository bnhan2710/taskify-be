export interface  AddMemberDto{
    userId: string[]
}

export function AddMemberDTO(body:any): AddMemberDto{ 
    return {
        userId: body.userId
    }
}