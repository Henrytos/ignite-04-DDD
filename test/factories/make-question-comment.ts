import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionComment, QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment";
import { faker } from '@faker-js/faker'

export function makeQuestionComment(override: Partial<QuestionCommentProps> = {}, id?: string) {
    const questionComment = QuestionComment.create({
        authorId: new UniqueEntityID(),
        questionId: new UniqueEntityID(),
        content: faker.lorem.sentence(),
        ...override
    }, new UniqueEntityID(id))

    return questionComment
}