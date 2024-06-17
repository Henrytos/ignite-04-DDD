import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
    answerCommentId: string;
    authorId: string;

}
interface DeleteAnswerCommentUseCaseResponse {
}

export class DeleteAnswerCommentUseCase {
    constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

    async execute({
        authorId,
        answerCommentId,
    }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
        const answerComment = await this.answerCommentsRepository.findById(answerCommentId)
        if (!(answerComment?.authorId.toValue() == authorId)) {
            throw new Error('User not allowed to delete this comment')
        }

        if (!answerComment) {
            throw new Error('Answer not found')
        }

        await this.answerCommentsRepository.delete(answerComment)

        return {
        }
    }
}