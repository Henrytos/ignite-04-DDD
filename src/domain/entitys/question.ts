import { randomUUID } from "crypto"

export class Question {
    private id: string
    private title: string
    private content: string

    constructor(content: string, title: string, id?: string) {
        this.title = title
        this.content = content
        this.id = id ?? randomUUID()
    }
}