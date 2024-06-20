import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { CreateQuestionUseCase } from "./create-question"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository

let sut: CreateQuestionUseCase
describe('create question use case (UNIT)', () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
        sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('should be able create question', async () => {

        const result = await sut.execute({
            authorId: '1',
            title: 'create my primary code',
            content: 'hello world',
            attachmentsIds: ['1', '2']
        })

        expect(result.isRight()).toEqual(true)
        expect(inMemoryQuestionsRepository.items[0]).toEqual(expect.objectContaining({
            title: 'create my primary code',
            content: 'hello world'
        }))

        expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
        ])
    })
})