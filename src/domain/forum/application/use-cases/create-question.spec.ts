import { QuestionRepository } from "../repositories/question-repository"
import { CreateQuestionUseCase } from "./create-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"


let questionRepository: QuestionRepository
let sut: CreateQuestionUseCase
describe('create question use case (UNIT)', () => {
    beforeEach(() => {
        questionRepository = new InMemoryQuestionsRepository()
        sut = new CreateQuestionUseCase(questionRepository)
    })

    it('should be able create question', async () => {
        const { question } = await sut.execute({
            authorId: '1',
            title: 'create my primary code',
            content: 'hello world'
        })
        expect(question.authorId).toBeTruthy()
    })
})