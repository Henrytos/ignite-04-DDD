import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/question-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface EditQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    title: string
    content: string;
}


type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
}>

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
            return left(new ResourceNotFoundError())
        }

        if (!(question.authorId.toValue() === authorId)) {
            return left(new NotAllowedError())
        }

        question.title = title
        question.content = content
        await this.questionsRepository.save(question)

        return right({})
    }
}