import { DomainEvent } from "../events/domain-event";
import { DomainEvents } from "../events/domain-events";
import { Entity } from "./entity";

export abstract class AggregateRoot<Props> extends Entity<Props> {
    protected _domainEvents: DomainEvent[] = []

    get domainEvents(): DomainEvent[] {
        return this._domainEvents
    }

    public addDomainEvent(domainEvent: DomainEvent) {
        this._domainEvents.push(domainEvent)
        DomainEvents.markAggregateForDispatch(this)
    }

    public clearEvents(): void {
        this._domainEvents = []
    }
}