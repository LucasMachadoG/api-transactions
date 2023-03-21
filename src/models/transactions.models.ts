import { v4 as createUuid } from "uuid";

export class Transactions {

    private _id: string

    constructor (
        private _titulo: string,
        private _valor: number,
        private _tipo: string
    ){
        this._id = createUuid()
    }

    public get id () {
        return this._id
    }

    public get titulo () {
        return this._titulo
    }

    public get valor () {
        return this._valor
    }

    public get tipo () {
        return this._tipo
    }

    public set titulo (titulo: string) {
        this._titulo = titulo
    }

    public set valor (valor: number) {
        this._valor = valor
    }

    public set tipo (tipo: string) {
        this._tipo = tipo
    }

    public toJasonTransaction() {
        return {
            id: this._id,
            titulo: this._titulo,
            valor: this._valor,
            tipo: this._tipo
        }
    }
}