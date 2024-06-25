import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository

let sut: AnswerQuestionUseCase

describe('answer question use case (UNIT)', () => {

  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository, inMemoryAnswerAttachmentsRepository)
  })
  it('create answer', async () => {


    const result = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'example content',
      attachmentsIds: ['1', '2']
    })

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: result.value?.answer.id,
        attachmentId: new UniqueEntityID('1')
      }),
      makeAnswerAttachment({
        answerId: result.value?.answer.id,
        attachmentId: new UniqueEntityID('2')
      })
    )


    expect(result.value?.answer.content).toEqual('example content')
    expect(result.value?.answer.attachments.currentItems).toHaveLength(2)
  })
})