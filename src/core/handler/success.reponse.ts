import { ReasonPhrases, StatusCodes } from './httpStatusCode';

abstract class SuccessResponse {
    constructor(
        public statusCode: number = StatusCodes.OK,  
        public message: string = ReasonPhrases.OK,
        public data?: any,
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    private getReasonPhrase(statusCode: number): string {
        switch (statusCode) {
            case StatusCodes.OK:
                return ReasonPhrases.OK;
            case StatusCodes.CREATED:
                return ReasonPhrases.CREATED;
            default:
                return 'Unknown Status';
        }
    }

    send(res: any) {
        return res.status(this.statusCode).json({
            status: this.getReasonPhrase(this.statusCode),
            message: this.message,
            data: this.data,
        });
    }
}



export class OK extends SuccessResponse {
    constructor({ status = StatusCodes.OK, message = ReasonPhrases.OK, data }: { status?: number; message?: string; data?: any }) {
        super(status, message, data);
    }
}

export class CREATED extends SuccessResponse {
    constructor({ status = StatusCodes.CREATED, message = ReasonPhrases.CREATED, data }: { status?: number; message?: string; data?: any }) {
        super(status, message, data);
    }
}
