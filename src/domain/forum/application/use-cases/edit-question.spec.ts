import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { EditQuestionUseCase } from "./edit-question"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('edit question use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('should be able delete question', async () => {

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
})