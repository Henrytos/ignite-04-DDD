import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}
interface DeleteAnswerUseCaseResponse {
}

export class DeleteAnswerUseCase {
    constructor(private answerRepository: AnswersRepository) { }

    async execute({
        authorId,
        answerId
    }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {

        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found')
        }

        if (!(answer.authorId.toString() === authorId)) {
            throw new Error('Unauthorized')
        }

        await this.answerRepository.delete(answer)

        return {

        }
    }
}