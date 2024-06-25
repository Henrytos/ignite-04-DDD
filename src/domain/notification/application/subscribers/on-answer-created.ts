import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event'
import { Console } from 'console'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnAnswerCreated implements EventHandler {
    constructor(private questionsRepository: QuestionsRepository, private sendNotificationUseCase: SendNotificationUseCase) {
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendNewAnswerNotification.bind(this),
            AnswerCreatedEvent.name,
        )
    }

    private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
        const question = await this.questionsRepository.findById(answer.questionId.toString())
        if (question) {
            await this.sendNotificationUseCase.execute({
                recipientId: question.authorId.toString(),
                title: `Nova notificação: ${question.title} - ${answer.content.substring(0, 10).concat('.....')}`,
                content: answer.excerpt,
            })
        }
    }
}