import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"
interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId: string
    content: string
}

export class AnswerQuestionUseCase {

    constructor(private answersRepository: AnswersRepository) { }
    execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
        const answer = Answer.create({
            content,
            authorId: instructorId,
            questionId,
        })

        return answer
    }
}
