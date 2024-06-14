import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";

interface DeleteQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
}
interface DeleteQuestionUseCaseResponse {
}

export class DeleteQuestionUseCase {
    constructor(private questionRepository: QuestionRepository) { }

    async execute({
        authorId,
        questionId
    }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            throw new Error('Question not found')
        }

        if (!(question.authorId.toString() === authorId)) {
            throw new Error('Unauthorized')
        }

        await this.questionRepository.delete(question)

        return {

        }
    }
}