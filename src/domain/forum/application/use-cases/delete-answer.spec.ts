
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { DeleteAnswerUseCase } from "./delete-answer"
import { makeAnswer } from "test/factories/make-answer"
import { NotAllowedError } from "./errors/not-allowed-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"


let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('delete answer use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
    })

    it('should be able delete answer', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-01')
        }, 'answer-01')

        inMemoryAnswersRepository.create(newAnswer)
        await sut.execute({
            authorId: 'author-01',
            answerId: 'answer-01'
        })
        expect(inMemoryAnswersRepository.items).toHaveLength(0)
    })


    it('should not be able delete answer where author-id-invalid', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-01')
        }, 'answer-01')

        inMemoryAnswersRepository.create(newAnswer)

        const result = await sut.execute({
            authorId: 'author-id-invalid',
            answerId: 'answer-01'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })


    it('should not be able delete answer-id-invalid', async () => {
        const result = await sut.execute({
            authorId: 'author-id-invalid',
            answerId: 'answer-id-invalid'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })


})