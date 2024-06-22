import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository"
import { SendNotificationUseCase } from "./send-notification"

let inMemoryNotificationsRepository: InMemoryNotificationsRepository

let sut: SendNotificationUseCase
describe('create notification use case (UNIT)', () => {
    beforeEach(() => {
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
        sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
    })

    it('should be able create notification', async () => {

        const result = await sut.execute({
            recipientId: '1',
            title: 'title example',
            content: 'content example',
        })

        expect(result.isRight()).toEqual(true)
        expect(inMemoryNotificationsRepository.items).toHaveLength(1)
        expect(inMemoryNotificationsRepository.items[0]).toEqual(expect.objectContaining({
            recipientId: result.value?.notification.recipientId
        }))
    })
})