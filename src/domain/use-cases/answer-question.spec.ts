import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('', () => {
    const answerQuestion = new AnswerQuestionUseCase()

    const answer = answerQuestion.execute({
        instructorId: '1',
        studentId: '1',
        content: 'olá está errado por isto......'
    })

    expect(answer.content).toEqual('olá está errado por isto......')
})