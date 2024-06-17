import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions"


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('fetch recent question use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
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

        const { questions } = await sut.execute({
            page: 1
        })

        expect(questions).toEqual([
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

        const { questions } = await sut.execute({
            page: 2
        })

        expect(questions).toHaveLength(2)
    })

})