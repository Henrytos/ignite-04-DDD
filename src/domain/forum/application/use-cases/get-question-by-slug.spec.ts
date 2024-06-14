import { QuestionRepository } from "../repositories/question-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { GetQuestionBySlug } from "./get-question-by-slug"
import { Question } from "../../enterprise/entities/question"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Slug } from "../../enterprise/entities/value-objects/slug"
import { makeQuestion } from "test/factories/make-question"


let inMemoryQuestionRepository: QuestionRepository
let sut: GetQuestionBySlug

describe('create question use case (UNIT)', () => {

    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionsRepository()
        sut = new GetQuestionBySlug(inMemoryQuestionRepository)
    })

    it('should be able create question', async () => {

        const newQuestion = makeQuestion()

        inMemoryQuestionRepository.create(newQuestion)

        const { question } = await sut.execute({
            slug: 'example-slug'
        })

        expect(question.slug.value).toEqual('example-slug')
        expect(question.title).toEqual(newQuestion.title)
    })
})