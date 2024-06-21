import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { makeQuestion } from "test/factories/make-question"
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers"
import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository"

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('fetch question answer  use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
        sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
    })

    it('should be able fetch  question answers  ', async () => {
        await inMemoryAnswersRepository.create(
            makeAnswer({ questionId: new UniqueEntityID('author-1') })
        )
        await inMemoryAnswersRepository.create(
            makeAnswer({ questionId: new UniqueEntityID('author-1') })
        )
        await inMemoryAnswersRepository.create(
            makeAnswer({ questionId: new UniqueEntityID('author-1') })
        )

        const result = await sut.execute({
            page: 1,
            questionId: 'author-1'
        })

        expect(result.value?.answers).toHaveLength(3)

    })

    it('should be able fetch question answers page 2 recent question ', async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryAnswersRepository.create(
                makeAnswer({ questionId: new UniqueEntityID('author-1') })
            )
        }

        const result = await sut.execute({
            page: 2,
            questionId: 'author-1'
        })

        expect(result.value?.answers).toHaveLength(2)
    })

})