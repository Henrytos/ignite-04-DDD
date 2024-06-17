import { CommentOnAnswerUseCase } from "./comment-on-answer"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-on-comments-repository"

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

let sut: CommentOnAnswerUseCase

describe('create answer use case (UNIT)', () => {
    beforeEach(() => {
        inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentRepository)
    })

    it('should be able create answer', async () => {
        const answer = makeAnswer({ authorId: new UniqueEntityID('author-1') })
        await inMemoryAnswersRepository.create(answer)

        const { answerComment } = await sut.execute({
            authorId: answer.authorId.toValue(),
            content: 'example content',
            answerId: answer.id.toValue()
        })

        expect(answerComment).toEqual(expect.objectContaining({
            answerId: answer.id,
            content: 'example content'
        }))
    })
})