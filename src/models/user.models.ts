import { Transactions } from "./transactions.models";
import { v4 as createUuid } from 'uuid'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'

export class User {

    private _id: string
    private _transactions: Transactions[]

    constructor (
        private _nome: string,
        private _cpf: number, 
        private _email: string,
        private _idade: number
    ){
        this._id = createUuid()
        this._transactions = []
    }

    public get id () {
        return this._id
    }

    public get nome () {
        return this._nome
    }

    public get cpf () {
        return this._cpf
    }

    public get email () {
        return this._email
    }

    public set nome (nome: string) {
        this._nome = nome
    }

    public set transactions (transaction: Transactions[]) {
        this._transactions = transaction
    }

    public get transactions () {
        return this._transactions
    }

    public set email (email: string) {
        this._email = email
    }

    public set idade (idade: number) {
        this._idade = idade
    }


    public toJason () {
        return {
            id: this._id,
            nome: this._nome,
            cpf: cpfValidator.format(this._cpf.toString().padStart(11, "0")),
            email: this._email,
            idade: this._idade
        }
    }

    public toJasonTrans () {
        return {
            id: this._id,
            nome: this._nome,
            cpf: cpfValidator.format(this._cpf.toString().padStart(11, "0")),
            email: this._email,
            idade: this._idade,
            transactions: this._transactions
        }
    }
}


