import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionAttachment, QuestionAttachmentProps } from "@/domain/forum/enterprise/entities/question-attachment";

export function makeQuestionAttachment(override: Partial<QuestionAttachmentProps> = {}, id?: string) {
    const questionAttachment = QuestionAttachment.create({
        attachmentId: new UniqueEntityID(),
        questionId: new UniqueEntityID(),
        ...override
    }, new UniqueEntityID(id))

    return questionAttachment
}