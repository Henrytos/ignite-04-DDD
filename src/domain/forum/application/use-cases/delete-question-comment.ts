import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
    questionCommentId: string;
    authorId: string;

}
interface DeleteQuestionCommentUseCaseResponse {
}

export class DeleteQuestionCommentUseCase {
    constructor(private questionCommentsRepository: QuestionCommentsRepository) { }

    async execute({
        authorId,
        questionCommentId,
    }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
        const questionComment = await this.questionCommentsRepository.findById(questionCommentId)

        if (!(questionComment?.authorId.toValue() == authorId)) {
            throw new Error('User not allowed to delete this comment')
        }

        if (!questionComment) {
            throw new Error('question comment not found')
        }

        await this.questionCommentsRepository.delete(questionComment)

        return {
        }
    }
}