import { Entity } from "../core/entities/entity"

interface AnswerProps {
    content: string
    authorId: string
    questionId: string
    createdAt: Date
    updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {

    get content() {
        return this.props.content
    }


}