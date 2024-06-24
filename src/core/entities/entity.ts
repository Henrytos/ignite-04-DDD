import { UniqueEntityID } from "./unique-entity-id"

export abstract class Entity<Props> {
    private _id: UniqueEntityID
    protected props: Props

    protected constructor(props: Props, id?: UniqueEntityID) {
        this._id = id ?? new UniqueEntityID()
        this.props = props
    }

    get id() {
        return this._id
    }

    equals(entity: Entity<any>) {
        if (entity.id == this._id) {
            return true
        }

        if (entity == this) {
            return true
        }

        return false
    }

}