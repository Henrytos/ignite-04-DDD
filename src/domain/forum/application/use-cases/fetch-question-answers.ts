import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface FetchQuestionAnswersUseCaseRequest {
    questionId: string
    page: number
}
interface FetchQuestionAnswersUseCaseResponse {
    answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
    constructor(private answerRepository: AnswersRepository) { }

    async execute({
        questionId,
        page
    }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {

        const answers = await this.answerRepository.findManyByQuestionId(questionId, { page })

        return {
            answers
        }
    }
}