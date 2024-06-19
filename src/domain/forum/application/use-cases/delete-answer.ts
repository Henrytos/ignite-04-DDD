import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";
import { Either, right } from "@/core/either";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerUseCase {
    constructor(private answerRepository: AnswersRepository) { }

    async execute({
        authorId,
        answerId
    }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {

        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            return right(new ResourceNotFoundError())
        }

        if (!(answer.authorId.toString() === authorId)) {
            return right(new NotAllowedError())
        }

        await this.answerRepository.delete(answer)

        return right({})
    }
}