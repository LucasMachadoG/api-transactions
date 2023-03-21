import { Request, Response } from "express";
import { UserDataBase } from "../database/user.database";
import { serverError } from "../errors/server.error";
import { Transactions } from "../models/transactions.models";


export class TransacitionsController {
  public listTransactions (req: Request, res: Response) {
    try {
      const { id } = req.params
  
      const database = new UserDataBase()
      const userTransactions = database.get(id)
  
      if (!userTransactions) {
        return res.status(404).send({
          ok: false,
          message: "Transaction not found"
        })
      }
  
      return res.status(200).send({
        ok: true, 
        message: "Transactions successfully obtained",
        data: userTransactions.transactions
      })
  
    } catch (error: any) {
      return serverError.genericError(res, error)
    }
  }

  public getTransaction (req: Request, res: Response) {
      try {
        const { userId ,id } = req.params
        
        const database = new UserDataBase()
        const user = database.get(userId)

        if (!user) {
          return res.status(404).send({
            ok: false,
            message: "User not found"
          })
        }

        const transaction = user?.transactions.find ((transaction) => transaction.id === id)

        if (!transaction) {
          return res.status(404).send({
            ok: false, 
            message: "Transaction not found"
          })
        }

        res.status(200).send({
            ok: true,
            message: "User successfully obtained",
            data: transaction?.toJasonTransaction()
        })

    } catch (error: any) {
        return serverError.genericError(res, error)
    }
  }

  public createTransaction (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { titulo, valor, tipo } = req.body;
      
            if (!titulo) {
              return res.status(400).send({
                ok: false,
                message: "Titulo was not provider"
              });
            }

            if (!valor) {
              return res.status(400).send({
                ok: false,
                message: "Valor was not provider"
              });
            }

            if (!titulo) {
              return res.status(400).send({
                ok: false,
                message: "Tipo was not provider"
              });
            }
      
            const database = new UserDataBase();
      
            const user = database.get(id);
      
            if (!user) {
              return res.status(404).send({
                ok: false,
                message: "User not found!"
              });
            }
      
            user.transactions.push(new Transactions(titulo, valor, tipo));
      
            return res.status(201).send({
              ok: true,
              message: "Transaction successfully created",
              data: user.transactions
            });
      
          } catch (error: any) {
            return serverError.genericError(res, error)
          }
  }

  public deleteTransaction (req: Request, res: Response) {
    try {
      const { userId, id } = req.params

      if (!id) {
        return res.status(400).send({
          ok: false,
          message: "Id was not provider"
        })
      }
      
      const database = new UserDataBase()
      const user = database.get(userId)
      
      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User not found!"
        })
      }

      const transactionIndex = user.transactions.findIndex((transaction) => transaction.id === id)


      if (transactionIndex < 0) {
        return res.status(404).send({
          ok: false, 
          message: "Transaction not found"
        })
      }

      user.transactions.splice(transactionIndex, 1)

      return res.status(200).send({
        ok: true, 
        message: "Transaction successfully deleted"
      })
    } catch (error: any) {
      return serverError.genericError(res, error)
    }
  }

  public updateTransaction (req: Request, res: Response) {
    try{
      const { userId, id } = req.params
      const { titulo, valor, tipo } = req.body

      const database = new UserDataBase()
      const user = database.get(userId)

      console.log (user)

      if (!user) {
        return res.status(404).send({
          ok: false, 
          message: "User not found"
        })
      }

      const transaction = user.transactions.find((transaction) => transaction.id === id)

      console.log (transaction)

      if (!transaction) {
        return res.status(404).send({
          ok: false, 
          message: "Transaction was not found"
        })
      }

      if (titulo) {
        transaction.titulo = titulo
      }

      if (valor) {
        transaction.valor = valor
      }

      if (tipo) {
        transaction.tipo = tipo
      }

      return res.status(200).send({
        ok: true, 
        message: "Transaction successfully updated",
        data: transaction?.toJasonTransaction
      })
    } catch (error: any) {
      return serverError.genericError(res, error)
    }
  }

}