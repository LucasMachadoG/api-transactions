import { Router } from "express";
import { TransacitionsController } from "../controllers/transactions.controller";
import { UserController } from "../controllers/user.controller";
import { cpfAlreadyExists, cpfValidMiddleware } from "../middlewares/cpfvalidated.middleware";
import { emailValided } from "../middlewares/emailvalidated.middleware";
import { middlewaresForMethodAndLog } from "../middlewares/log.midllewares";

export const userRoutes = () => {
    //Lembrando que o router eh como se fosse uma ramificacao do do app prinicipal, para nos conseguir criar rotas em arquivos separados
    const app = Router()

    //GET http://localhost:3333/user
    app.get ("/", middlewaresForMethodAndLog, new UserController().list)

    //GET http://localhost:3333/user/abc-1234
    app.get ("/:id", middlewaresForMethodAndLog, new UserController().get)

    //POST http://localhost:3333/user
    app.post ("/", middlewaresForMethodAndLog, emailValided, cpfValidMiddleware, cpfAlreadyExists, new UserController().create)

    //DELETE http://localhost:3333/user/abc-1234
    app.delete ("/:id", middlewaresForMethodAndLog, new UserController().delete)

    //PUT http://localhost:3333/user/abc-1234
    app.put ("/:id", middlewaresForMethodAndLog, new UserController().update)

    //GET http://localhost:3333/user/abc-1234/transactions
    app.get ("/:id/transactions", new TransacitionsController().listTransactions)

    //GET http://localhost:3333/user/abc-1234/transactions/abc-1234
    app.get ("/:userId/transactions/:id", middlewaresForMethodAndLog, new TransacitionsController().getTransaction)

    //POST http://localhost:3333/user/abc-1234/transactions
    app.post ("/:id/transactions", middlewaresForMethodAndLog, new TransacitionsController().createTransaction)

    //DELETE http://localhost:3333/user/abc-1234/transactions
    app.delete ("/:userId/transactions/:id", middlewaresForMethodAndLog, new TransacitionsController().deleteTransaction)

    //PUT http://localhost:3333/user/abc-1234/transactions
    app.put ("/:userId/transactions/:id", middlewaresForMethodAndLog, new TransacitionsController().updateTransaction)


    return app
}