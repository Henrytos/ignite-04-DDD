import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import { AnswerAttachmentsRepository } from "../repositories/answer-attachments-repository";

interface EditAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
    attachmentsIds: string[];
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    answer: Answer
}>

export class EditAnswerUseCase {
    constructor(private answersRepository: AnswersRepository, private answerAttachmentsRepository: AnswerAttachmentsRepository) { }

    async execute({
        authorId,
        answerId,
        content,
        attachmentsIds
    }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {

        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (!(answer.authorId.toValue() === authorId)) {
            return left(new NotAllowedError())
        }

        const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answer.id.toString())

        const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments)
        const answerAttachments = attachmentsIds.map(attachmentsId => {
            return AnswerAttachment.create({
                answerId: answer.id,
                attachmentId: new UniqueEntityID(attachmentsId),
            })
        })

        answerAttachmentList.update(answerAttachments)
        answer.content = content
        answer.attachments = answerAttachmentList
        await this.answersRepository.save(answer)

        return right({
            answer
        })
    }
}