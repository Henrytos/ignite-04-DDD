import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('answer question use case (UNIT)', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('', async () => {

    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'olá está errado por isto......',
    })

    expect(answer.content).toEqual('olá está errado por isto......')

  })
})