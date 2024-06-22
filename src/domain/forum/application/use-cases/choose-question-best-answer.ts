import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/question-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

interface ChooseQuestionBestAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}
type ChooseQuestionBestAnswerUseCaseResponse = Either<
    ResourceNotFoundError | NotAllowedError, {
        question: Question
    }>

export class ChooseQuestionBestAnswerUseCase {
    constructor(private answersRepository: AnswersRepository, private questionsRepository: QuestionsRepository) { }

    async execute({
        authorId,
        answerId
    }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {

        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        const question = await this.questionsRepository.findById(answer.questionId.toValue())

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (!(authorId === question.authorId.toValue())) {
            return left(new NotAllowedError())
        }

        question.bestAnswerId = answer.id

        await this.questionsRepository.save(question)

        return right({
            question
        })
    }
}