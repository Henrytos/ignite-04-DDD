import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../entities/answer';

const fakeAnswersRepository: AnswersRepository = {
    create: async (answer: Answer) => {
        return;
    }
}

test('', () => {

    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

    const answer = answerQuestion.execute({
        instructorId: '1',
        questionId: '1',
        content: 'olá está errado por isto......'
    })

    expect(answer.content).toEqual('olá está errado por isto......')
})