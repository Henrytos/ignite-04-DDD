import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
    AnswerAttachment,
    AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachment(
    override: Partial<AnswerAttachmentProps> = {},
    id?: string,
) {
    const answerAttachment = AnswerAttachment.create(
        {
            answerId: new UniqueEntityID(),
            attachmentId: new UniqueEntityID(),
            ...override,
        },
        new UniqueEntityID(id),
    )

    return answerAttachment
}