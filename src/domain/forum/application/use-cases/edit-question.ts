import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/question-repository";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { QuestionAttachmentsRepository } from "../repositories/question-attachments-repository";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface EditQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    title: string
    content: string;
    attachmentsIds: string[];
}


type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
}>

export class EditQuestionUseCase {
    constructor(private questionsRepository: QuestionsRepository, private questionAttachmentsRepository: QuestionAttachmentsRepository) { }

    async execute({
        authorId,
        questionId,
        content,
        title,
        attachmentsIds
    }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {

        const question = await this.questionsRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (!(question.authorId.toValue() === authorId)) {
            return left(new NotAllowedError())
        }

        const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

        const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)
        const questionAttachments = attachmentsIds.map((attachmentsId) => {
            return QuestionAttachment.create({
                questionId: question.id,
                attachmentId: new UniqueEntityID(attachmentsId),
            })
        }
        )
        questionAttachmentList.update(questionAttachments)
        question.title = title
        question.content = content
        question.attachments = questionAttachmentList

        await this.questionsRepository.save(question)

        return right({})
    }
}