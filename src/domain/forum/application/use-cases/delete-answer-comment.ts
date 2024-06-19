import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
    answerCommentId: string;
    authorId: string;

}
type DeleteAnswerCommentUseCaseResponse = Either<string, {}>

export class DeleteAnswerCommentUseCase {
    constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

    async execute({
        authorId,
        answerCommentId,
    }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
        const answerComment = await this.answerCommentsRepository.findById(answerCommentId)
        if (!(answerComment?.authorId.toValue() == authorId)) {
            return left('User not allowed to delete this comment')
        }

        if (!answerComment) {
            return left('Answer not found')
        }

        await this.answerCommentsRepository.delete(answerComment)

        return right({})
    }
}