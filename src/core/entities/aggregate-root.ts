import { DomainEvent } from "../events/domain-event";
import { Entity } from "./entity";

export abstract class AggregateRoot<Props> extends Entity<Props> {
    protected _domainEvents: DomainEvent[] = []

    get domainEvents(): DomainEvent[] {
        return this._domainEvents
    }

    clearEvents(): void {
        this._domainEvents = []
    }
}