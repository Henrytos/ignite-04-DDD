import { Entity } from "../core/entities/entity"
import { UniqueEntityID } from "../core/entities/unique-entity-id"
import { Optional } from "../core/types/optional"

interface AnswerProps {
    content: string
    authorId: UniqueEntityID
    questionId: UniqueEntityID
    createdAt: Date
    updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
    get authorId() {
        return this.props.authorId
    }

    get questionId() {
        return this.props.questionId
    }

    get content() {
        return this.props.content
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    get createdAt() {
        return this.props.createdAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    set content(content: string) {
        this.props.content = content
        this.touch
    }

    get excerpt() {
        return this.content.substring(0, 120).trimEnd().concat('....')
    }


    static create(props: Optional<AnswerProps, "createdAt">, id?: UniqueEntityID) {
        const answer = new Answer({
            ...props,
            createdAt: new Date()
        }, id)
        return answer
    }

}

