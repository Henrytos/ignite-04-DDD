import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { EditQuestionUseCase } from "./edit-question"
import { makeQuestion } from "test/factories/make-question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { NotAllowedError } from "./errors/not-allowed-error"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository"
import { makeQuestionAttachment } from "test/factories/make-question-attachment"


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('edit question use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentRepository)
    })

    it('should be able edit question', async () => {

        const question = makeQuestion({
            authorId: new UniqueEntityID('author-01'),
        }, 'question-01')

        inMemoryQuestionsRepository.create(question)
        inMemoryQuestionAttachmentRepository.items.push(
            makeQuestionAttachment({
                questionId: question.id,
                attachmentId: new UniqueEntityID('1')
            }),
            makeQuestionAttachment({
                questionId: question.id,
                attachmentId: new UniqueEntityID('2')
            }))

        await sut.execute({
            questionId: question.id.toValue(),
            authorId: 'author-01',
            content: 'content',
            title: 'question',
            attachmentsIds: ['1', '3']
        })

        expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
        ])

    })

    it('should be able edit question where author id invalid', async () => {


        const question = makeQuestion({
            authorId: new UniqueEntityID('author-01'),
        }, 'question-01')

        inMemoryQuestionsRepository.create(question)

        const result = await sut.execute({
            questionId: question.id.toValue(),
            authorId: 'author-02',
            content: 'content',
            title: 'question',
            attachmentsIds: []
        })

        expect(result.isLeft()).toEqual(true)
        expect(result.isRight()).toEqual(false)
    })
})