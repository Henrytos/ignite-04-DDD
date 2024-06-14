import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers'

let answersRepository: AnswersRepository
let sut: AnswerQuestionUseCase

describe('answer question use case (UNIT)', () => {

  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(answersRepository)
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