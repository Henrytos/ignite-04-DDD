import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('fetch recent question use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
        sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
    })

    it('should be able fetch recent question ', async () => {
        await inMemoryQuestionsRepository.create(
            makeQuestion({ createdAt: new Date(2022, 0, 20) }),
        )
        await inMemoryQuestionsRepository.create(
            makeQuestion({ createdAt: new Date(2022, 0, 18) }),
        )
        await inMemoryQuestionsRepository.create(
            makeQuestion({ createdAt: new Date(2022, 0, 23) }),
        )

        const result = await sut.execute({
            page: 1
        })

        expect(result.value?.questions).toEqual([
            expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
            expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
            expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
        ])
    })

    it('should be able fetch page 2 recent question ', async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryQuestionsRepository.create(
                makeQuestion({ createdAt: new Date(2022, 0, i) }),
            )

        }

        const result = await sut.execute({
            page: 2
        })

        expect(result.value?.questions).toHaveLength(2)
    })

})