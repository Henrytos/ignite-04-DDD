
import { EditAnswerUseCase } from "./edit-answer"
import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { NotAllowedError } from "./errors/not-allowed-error"
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository"
import { makeAnswerAttachment } from "test/factories/make-answer-attachment"

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('edit answer use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
        sut = new EditAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerAttachmentsRepository)
    })

    it('should be able edit answer', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-01'),
        }, 'answer-01')


        inMemoryAnswerAttachmentsRepository.items.push(
            makeAnswerAttachment({
                answerId: newAnswer.id,
                attachmentId: new UniqueEntityID('1')
            }),
            makeAnswerAttachment({
                answerId: newAnswer.id,
                attachmentId: new UniqueEntityID('2')
            }),
        )

        inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            answerId: newAnswer.id.toValue(),
            authorId: 'author-01',
            content: 'content',
            attachmentsIds: ['1', '3']
        })


        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'content',
        })
        expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(2)
        expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
        ])
    })

    it('should not be able edit answer where author id invalid', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-01'),
        }, 'answer-01')

        inMemoryAnswersRepository.create(newAnswer)

        const result = await sut.execute({
            answerId: newAnswer.id.toValue(),
            authorId: 'author-id-invalid',
            content: 'content',
            attachmentsIds: []
        })

        expect(result.isLeft()).toEqual(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})