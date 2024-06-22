import { NotificationsRepository } from "@/domain/notification/application/repositories/notifications-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationsRepository implements NotificationsRepository {
    items: Notification[] = [];

    async create(notification: Notification) {
        this.items.push(notification);
    }
}