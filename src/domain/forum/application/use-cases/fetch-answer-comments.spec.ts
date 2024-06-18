import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository"
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments"
import { makeAnswerComment } from "test/factories/make-answer-comment"


let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('fetch question answer  use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
        sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
    })

    it('should be able fetch answers comments  ', async () => {
        await inMemoryAnswerCommentsRepository.create(
            makeAnswerComment({ answerId: new UniqueEntityID('author-1') })
        )

        await inMemoryAnswerCommentsRepository.create(
            makeAnswerComment({ answerId: new UniqueEntityID('author-1') })
        )

        await inMemoryAnswerCommentsRepository.create(
            makeAnswerComment({ answerId: new UniqueEntityID('author-1') })
        )

        const { answerComments } = await sut.execute({
            page: 1,
            answerId: 'author-1'
        })

        expect(answerComments).toHaveLength(3)

    })

    it('should be able fetch question answers page 2 recent question ', async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryAnswerCommentsRepository.create(
                makeAnswerComment({ answerId: new UniqueEntityID('author-1') })
            )
        }

        const { answerComments } = await sut.execute({
            page: 2,
            answerId: 'author-1'
        })

        expect(answerComments).toHaveLength(2)
    })

})