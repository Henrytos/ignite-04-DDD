import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { DeleteQuestionUseCase } from "./delete-question"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { NotAllowedError } from "./errors/not-allowed-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('delete question use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('should be able delete question', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-01')
        }, 'question-01')

        inMemoryQuestionsRepository.create(newQuestion)
        await sut.execute({
            authorId: 'author-01',
            questionId: 'question-01'
        })
        expect(inMemoryQuestionsRepository.items).toHaveLength(0)
    })


    it('should not be able delete question where author-id-invalid', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-01')
        }, 'question-01')

        inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            authorId: 'author-id-invalid',
            questionId: 'question-01'
        })

        expect(result.isLeft()).toEqual(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })


    it('should not be able delete author id invalid', async () => {


        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-01')
        }, 'question-02')


        const result = await sut.execute({
            authorId: 'author-id-invalid',
            questionId: 'question-01'
        })

        expect(result.isLeft()).toEqual(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })


})