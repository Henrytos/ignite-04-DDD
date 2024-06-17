import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/question-repository";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";

interface CommentOnQuestionUseCaseRequest {
    questionId: string;
    authorId: string;
    content: string;

}
interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository, private questionCommentsRepository: QuestionCommentsRepository) { }

    async execute({
        authorId,
        questionId,
        content
    }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {

        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            throw new Error('Question not found')
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityID(authorId),
            questionId: new UniqueEntityID(questionId),
            content
        })

        await this.questionCommentsRepository.create(questionComment)

        return {
            questionComment
        }
    }
}