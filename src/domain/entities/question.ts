import { randomUUID } from "node:crypto"
import { Entity } from "../core/entities/entity"
import { Slug } from "./value-objects/slug"
import { Optional } from "../core/types/optional"
import { UniqueEntityID } from "../core/entities/unique-entity-id"

interface QuestionProps {
    authorId: string
    bestAnswerId?: string
    slug: Slug
    title: string
    content: string
    createdAt: Date
    updatedAt?: Date

}

export class Question extends Entity<QuestionProps> {
    get content() {
        return this.props.content
    }

    static create(props: Optional<QuestionProps, "createdAt">, id?: UniqueEntityID) {
        const question = new Question({
            ...props,
            createdAt: new Date()
        }, id)
        return question
    }
}