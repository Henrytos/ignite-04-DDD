import { create } from "domain"
import { QuestionRepository } from "../repositories/question-repository"
import { CreateQuestionUseCase } from "./create-question"

const fakeQuestionRepository: QuestionRepository = {
    async create() {
        return
    }
}

describe('create question use case (UNIT)', () => {
    it('should be able create question', async () => {
        const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)
        const { question } = await createQuestion.execute({
            authorId: '1',
            title: 'create my primary code',
            content: 'hello world'
        })
        expect(question.authorId).toBeTruthy()
    })
})