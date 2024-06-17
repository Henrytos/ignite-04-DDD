import { QuestionsRepository } from "../repositories/question-repository";

interface EditQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    title: string
    content: string;
}
interface EditQuestionUseCaseResponse {
}

export class EditQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository) { }

    async execute({
        authorId,
        questionId,
        content,
        title
    }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {

        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            throw new Error('Question not found')
        }

        if (!(question.authorId.toValue() === authorId)) {
            throw new Error('Unauthorized')
        }

        question.title = title
        question.content = content
        await this.questionsRepository.save(question)

        return {
        }
    }
}