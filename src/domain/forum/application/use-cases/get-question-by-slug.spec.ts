import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { GetQuestionBySlugUseCase } from "./get-question-by-slug"
import { makeQuestion } from "test/factories/make-question"


let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('create question use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionsRepository()
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
    })

    it('should be able create question', async () => {

        const newQuestion = makeQuestion()

        inMemoryQuestionRepository.create(newQuestion)

        const { question } = await sut.execute({
            slug: 'example-slug'
        })

        expect(question.slug.value).toEqual('example-slug')
        expect(question.title).toEqual(newQuestion.title)
    })
})