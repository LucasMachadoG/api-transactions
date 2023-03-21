import * as EmailValidator from 'email-validator';
import { NextFunction, Request, Response } from 'express';
import { serverError } from '../errors/server.error';

export const emailValided = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body 

        const isValid = EmailValidator.validate(email)

        if (!isValid) {
            return res.status(400).send({
                ok: false,
                message: "Email is invalid"
            })
        }

        next ()
    } catch (error: any) {
        return serverError.genericError(res, error)
    }
}   

