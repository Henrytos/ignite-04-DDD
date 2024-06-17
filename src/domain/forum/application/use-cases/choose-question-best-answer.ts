import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answers-repository";
import { QuestionsRepository } from "../repositories/question-repository";

interface ChooseQuestionBestAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}
interface ChooseQuestionBestAnswerUseCaseResponse {
    question: Question
}

export class ChooseQuestionBestAnswerUseCase {
    constructor(private answersRepository: AnswersRepository, private questionsRepository: QuestionsRepository) { }

    async execute({
        authorId,
        answerId
    }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {

        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found')
        }

        const question = await this.questionsRepository.findById(answer.questionId.toValue())

        if (!question) {
            throw new Error('Question not found')
        }

        if (!(authorId === question.authorId.toValue())) {
            throw new Error('Unauthorized')
        }

        question.bestAnswerId = answer.id

        await this.questionsRepository.save(question)

        return {
            question
        }
    }
}