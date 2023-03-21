import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import { NextFunction, Request, Response } from 'express'
import { UserDataBase } from '../database/user.database'
import { serverError } from '../errors/server.error'

export const cpfValidMiddleware  = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cpf } = req.body

        if (!cpf) {
            return res.status(400).send({
                ok: false,
                message: "CPF was not provide (middleware)"
            })
        }

        const cpfText = cpf.toString().padStart(11, "0")

        let isValid = cpfValidator.isValid(cpfText)

        if (!isValid) {
            return res.status(400).send({
                ok: false,
                message: "CPF is invalid"
            })
        }

        next ()
    } catch (error: any) {
        return serverError.genericError(res, error)
    }
}

export const cpfAlreadyExists = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cpf } = req.body
        const database = new UserDataBase()
        const user = database.getBycpf(cpf)

        if (user) {
            return res.status(400).send({
                ok: false,
                message: "Growdever already exists "
            })
        }

        next()
    } catch (error: any) {
        return serverError.genericError(res, error)
    }
}