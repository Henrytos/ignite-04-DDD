import { NotificationsRepository } from "@/domain/notification/application/repositories/notifications-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationsRepository implements NotificationsRepository {
    items: Notification[] = [];

    async findById(notificationId: string) {
        const notification = this.items.find(item => item.id.toString() === notificationId);
        if (!notification) {
            return null
        }
        return notification
    }
    async save(notification: Notification) {
        const index = this.items.findIndex(item => item.id === notification.id)
        this.items[index] = notification
    }
    async create(notification: Notification) {
        this.items.push(notification);
    }
}