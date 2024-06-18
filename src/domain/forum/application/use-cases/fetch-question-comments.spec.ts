import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository"
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments"
import { makeQuestionComment } from "test/factories/make-question-comment"


let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('fetch question question  use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
        sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
    })

    it('should be able fetch questions comments  ', async () => {
        await inMemoryQuestionCommentsRepository.create(
            makeQuestionComment({ questionId: new UniqueEntityID('author-1') })
        )

        await inMemoryQuestionCommentsRepository.create(
            makeQuestionComment({ questionId: new UniqueEntityID('author-1') })
        )

        await inMemoryQuestionCommentsRepository.create(
            makeQuestionComment({ questionId: new UniqueEntityID('author-1') })
        )

        const { questionComments } = await sut.execute({
            page: 1,
            questionId: 'author-1'
        })

        expect(questionComments).toHaveLength(3)

    })

    it('should be able fetch question questions page 2 recent question ', async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryQuestionCommentsRepository.create(
                makeQuestionComment({ questionId: new UniqueEntityID('author-1') })
            )
        }

        const { questionComments } = await sut.execute({
            page: 2,
            questionId: 'author-1'
        })

        expect(questionComments).toHaveLength(2)
    })

})