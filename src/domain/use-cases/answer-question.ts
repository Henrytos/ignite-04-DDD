import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseRequest {
    studentId: string
    instructorId: string
    content: string
}

export class AnswerQuestionUseCase {
    execute({ instructorId, studentId, content }: AnswerQuestionUseCaseRequest) {
        const answer = new Answer(content)
        return answer
    }
}

