import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";

interface GetQuestionBySlugRequest {
    slug: string
}
interface GetQuestionBySlugResponse {
    question: Question
}

export class GetQuestionBySlug {
    constructor(private questionRepository: QuestionRepository) { }

    async execute({
        slug
    }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {

        const question = await this.questionRepository.findBySlug(slug)

        if (!question) {
            throw new Error('Question not found')
        }

        return {
            question
        }
    }
}