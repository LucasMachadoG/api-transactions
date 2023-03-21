import { Request, Response } from "express"
import { UserDataBase } from "../database/user.database"
import { serverError } from "../errors/server.error"
import { User } from "../models/user.models"

export class UserController {
    public list (req: Request, res: Response) {
        try {
            const { nome, cpf, email } = req.query

            const database = new UserDataBase ()
            let users = database.list ()

            if (nome) {
                users = users.filter ((user) => {
                    return user.nome === nome
                })
            } 

            if (cpf) {
                users = users.filter ((user) => {
                    return user.cpf === Number(cpf)
                })
            } 

            if (email) {
                users = users.filter ((user) => {
                    return user.email === email
                })
            }

            const result = users.map ((user) => {
                return user.toJason()
            })

            res.status(200).send({
                ok: true, 
                message: "Users successfully listed",
                data: result
            })
        } catch (error: any) {
           return serverError.genericError(res, error)
        }  
    }

    public get (req: Request, res: Response) {
        try {
            const { id } = req.params

            const database = new UserDataBase()
            const user = database.get(id)

            console.log (user)

            if (!user) {
                return res.status(404).send({
                    ok: false, 
                    message: "User not found"
                })
            }

            res.status(200).send({
                ok: true,
                message: "User successfully obtained",
                data: user.toJason()
            })
        } catch (error: any) {
            return serverError.genericError(res, error)
        }
    }

    public create (req: Request, res: Response) {
        try {
            
            const { nome, cpf, email, idade } = req.body
    
            if (!nome) {
                return res.status(400).send({
                    ok: false, 
                    message: "Nome was not provide!"
                })
            }
    
            if (!cpf) {
                return res.status(400).send({
                    ok: false, 
                    message: "CPF was not provide!"
                })
            }
    
            if (!email) {
                return res.status(400).send({
                    ok: false, 
                    message: "Email was not provide!"
                })
            }
    
            if (!idade) {
                return res.status(400).send({
                    ok: false, 
                    message: "Idade was not provide!"
                })
            }
    
            const user = new User (nome, cpf, email, idade)
    
            const database = new UserDataBase()
            database.create(user)
    
            return res.status(201).send({
                ok: true,
                message: "User successfully created",
                data: user.toJason()
            })

        } catch (error: any) {
            return serverError.genericError(res, error)
        }
    }

    public delete (req: Request, res: Response) {
        try {
            const { id } = req.params

            const database = new UserDataBase()
            const userIndex = database.getIndex(id)
            const userDeleted = database.get(id) 

            if (userIndex < 0) {
                return res.status(404).send({
                    ok: false, 
                    message: "User not found"
                })
            }

            database.delete(userIndex)

            return res.status(200).send({
                ok: true, 
                message: "User successfully deleted!",
                Userdeleted: userDeleted?.toJason()
            })

        } catch (error: any) {
            return serverError.genericError(res, error)
        }
    }

    public update (req: Request, res: Response) {
        try {
            const { id } = req.params
            const { nome, email, idade } = req.body

            const database = new UserDataBase()
            const user = database.get(id)

            if (!user) {
                return res.status(404).send({
                    ok: false, 
                    message: "User not found"
                })
            }

            if (nome) {
                user.nome = nome
            }

            if (email) {
                user.email = email
            }

            if (idade) {
                user.idade = idade
            }

            return res.status(200).send({
                ok: true,
                message: "User successfully update",
                UserUpdate: user.toJason()
            })

        } catch (error: any) {
            return serverError.genericError(res, error)
        }
    }  
}