import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
    items: AnswerComment[] = [];

    async create(answerComment: AnswerComment) {
        this.items.push(answerComment)
    }

    async findById(id: string) {
        const answerComment = this.items.find(item => item.id.toValue() == id)

        if (!answerComment) {
            return null
        }

        return answerComment
    }

    async delete(answerComment: AnswerComment) {
        const itemIndex = this.items.findIndex(item => item.id.toValue() === answerComment.id.toValue())
        this.items.splice(itemIndex, 1)
    }
}