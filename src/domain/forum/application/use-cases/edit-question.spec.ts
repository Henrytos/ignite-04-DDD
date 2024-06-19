import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { EditQuestionUseCase } from "./edit-question"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { NotAllowedError } from "./errors/not-allowed-error"


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('edit question use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository)

    })

    it('should be able edit question', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-01'),
        }, 'question-01')

        inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            questionId: newQuestion.id.toValue(),
            authorId: 'author-01',
            content: 'content',
            title: 'question'
        })

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: 'question',
            content: 'content'
        })
    })

    it('should be able edit question where author id invalid', async () => {


        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-01'),
        }, 'question-01')

        inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            questionId: newQuestion.id.toValue(),
            authorId: 'author-02',
            content: 'content',
            title: 'question'
        })

    })


})