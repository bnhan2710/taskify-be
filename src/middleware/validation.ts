import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../response/errors/error.response'; 

const validate = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw new BadRequestError(error.message);
        }
        next();
    };
};

export default validate;