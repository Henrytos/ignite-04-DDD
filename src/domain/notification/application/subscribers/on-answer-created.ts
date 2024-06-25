import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event'
import { Console } from 'console'

export class OnAnswerCreated implements EventHandler {
    constructor() {
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendNewAnswerNotification.bind(this),
            AnswerCreatedEvent.name,
        )
    }

    private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
        console.log('New answer created!')
        console.log(answer)
    }
}