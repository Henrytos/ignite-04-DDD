import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer"
import { makeQuestion } from "test/factories/make-question"
import { makeAnswer } from "test/factories/make-answer"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"


let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase
describe('choose question best answer use case (UNIT)', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository()

        sut = new ChooseQuestionBestAnswerUseCase(inMemoryAnswersRepository, inMemoryQuestionsRepository)
    })

    it('should be able choose question best answer in question', async () => {
        const question = makeQuestion()

        const answer = makeAnswer({
            questionId: question.id
        })

        inMemoryAnswersRepository.create(answer)
        inMemoryQuestionsRepository.create(question)

        await sut.execute({
            answerId: answer.id.toValue(),
            authorId: question.authorId.toValue(),
        })

        expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
    })


    it('should not be able choose question best answer in question where author id invalid', async () => {
        const question = makeQuestion({
            authorId: new UniqueEntityID('author-01')
        })

        const answer = makeAnswer({
            questionId: question.id
        })

        inMemoryAnswersRepository.create(answer)
        inMemoryQuestionsRepository.create(question)

        await expect(() => {
            return sut.execute({
                answerId: answer.id.toValue(),
                authorId: 'author-02',
            })
        }).rejects.toBeInstanceOf(Error)
    })
})