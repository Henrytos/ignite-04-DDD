import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { GetQuestionBySlugUseCase } from "./get-question-by-slug"
import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('get question by slug use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
    })

    it('should be able get question by slug', async () => {

        const newQuestion = makeQuestion()

        inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            slug: 'example-slug'
        })

        expect(result.isRight()).toEqual(true)
        expect(result.value).toEqual({
            question: newQuestion
        })
    })
})