import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('answer question use case (UNIT)', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('', async () => {

    const result = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'example content',
    })

    expect(result.value?.answer.content).toEqual('example content')

  })
})