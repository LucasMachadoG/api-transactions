import { User } from "../models/user.models";
import { Users } from "./users";

export class UserDataBase {
    public list () {
        return [
            ...Users
        ]
    }

    public get (id: string) {
       return Users.find ((user) => user.id === id)
    }

    public create (user: User) {
        Users.push (user)
    }

    public getBycpf (cpf: number) {
        return Users.find ((user) => user.cpf === cpf)
    } 

    public getIndex (id: string) {
        return Users.findIndex ((user) => user.id === id)
    }

    public delete (index: number) {
        return Users.splice (index, 1)
    }
}