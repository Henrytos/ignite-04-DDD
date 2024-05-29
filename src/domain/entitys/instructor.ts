import { randomUUID } from "crypto"

export class Instructor {
    private id: string
    private name: string

    constructor(name: string, id?: string) {
        this.name = name
        this.id = id ?? randomUUID()
    }
}