import { CreateQuestionUseCase } from "./create-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"


let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
describe('create question use case (UNIT)', () => {
    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionsRepository()
        sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
    })

    it('should be able create question', async () => {

        const result = await sut.execute({
            authorId: '1',
            title: 'create my primary code',
            content: 'hello world'
        })

        expect(result.isRight()).toEqual(true)
        expect(inMemoryQuestionRepository.items[0]).toEqual(expect.objectContaining({
            id: result.value?.question.id,
            authorId: result.value?.question.authorId,
            title: 'create my primary code',
            content: 'hello world'
        }))
    })
})