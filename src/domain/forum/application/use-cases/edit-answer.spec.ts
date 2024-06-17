
import { EditAnswerUseCase } from "./edit-answer"
import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"


let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('edit answer use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new EditAnswerUseCase(inMemoryAnswersRepository)
    })

    it('should be able edit answer', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-01'),
        }, 'answer-01')

        inMemoryAnswersRepository.create(newAnswer)

        const { answer } = await sut.execute({
            answerId: newAnswer.id.toValue(),
            authorId: 'author-01',
            content: 'content',
        })

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            id: answer.id,
            content: 'content',
        })
    })

    it('should not be able edit answer where author id invalid', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-01'),
        }, 'answer-01')

        inMemoryAnswersRepository.create(newAnswer)

        await expect(() => {
            return sut.execute({
                answerId: newAnswer.id.toValue(),
                authorId: 'author-id-invalid',
                content: 'content',
            })
        }).rejects.toBeInstanceOf(Error)

    })
})