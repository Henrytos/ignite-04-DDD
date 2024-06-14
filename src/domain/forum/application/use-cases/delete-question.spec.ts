import { QuestionRepository } from "../repositories/question-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { DeleteQuestionUseCase } from "./delete-question"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"


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

        await expect(() => {
            return sut.execute({
                authorId: 'author-id-invalid',
                questionId: 'question-01'
            })
        }).rejects.toBeInstanceOf(Error)
    })


    it('should not be able delete question-id-invalid', async () => {
        await expect(() => {
            return sut.execute({
                authorId: 'author-id-invalid',
                questionId: 'question-id-invalid'
            })
        }).rejects.toBeInstanceOf(Error)
    })


})