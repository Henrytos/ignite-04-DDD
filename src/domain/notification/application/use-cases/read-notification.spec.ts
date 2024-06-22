import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository"
import { ReadNotificationUseCase } from "./read-notification"
import { makeNotification } from "test/factories/make-notification"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryNotificationsRepository: InMemoryNotificationsRepository

let sut: ReadNotificationUseCase
describe('create notification use case (UNIT)', () => {
    beforeEach(() => {
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
        sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
    })

    it('should be able read notification', async () => {
        const notification = makeNotification()

        inMemoryNotificationsRepository.create(notification)

        const result = await sut.execute({
            recipientId: notification.recipientId.toString(),
            notificationId: notification.id.toString()
        })

        expect(result.isRight()).toEqual(true)
        expect(inMemoryNotificationsRepository.items).toHaveLength(1)
        expect(inMemoryNotificationsRepository.items[0]).toEqual(expect.objectContaining({
            readAt: expect.any(Date)
        }))
    })

    it('should be able not  read notification where recipientId invalid', async () => {
        const notification = makeNotification({
            recipientId: new UniqueEntityID('recipient-01')
        })

        inMemoryNotificationsRepository.create(notification)

        const result = await sut.execute({
            recipientId: 'recipient-02',
            notificationId: notification.id.toString()
        })

        expect(result.isLeft()).toEqual(true)
        expect(inMemoryNotificationsRepository.items).toHaveLength(1)
    })

})